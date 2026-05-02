import React, { useEffect, useState, useMemo } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import { DOMAINS, MAIN_QUESTIONS } from '../questionBank';
import { PROBING_QUESTIONS } from '../constants';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
    Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { format, subDays, isAfter, isBefore, startOfDay } from 'date-fns';

export const AdminDashboard: React.FC<{ onViewAssessment: () => void }> = ({ onViewAssessment }) => {
  const { userProfile } = useAuth();
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Advanced Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBizType, setFilterBizType] = useState('all');
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [filterDateRange, setFilterDateRange] = useState('all'); // all, 7d, 30d, 90d

  useEffect(() => {
    const fetchAssessments = async () => {
      if (userProfile?.role !== 'admin') return;
      try {
        const querySnapshot = await getDocs(collection(db, 'assessments'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAssessments(data);
      } catch (error) {
        console.error("Error fetching assessments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, [userProfile]);

  const filteredAssessments = useMemo(() => {
    let filtered = assessments;

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(a => 
        (a.id?.toLowerCase().includes(term)) ||
        (a.enumeratorId?.toLowerCase().includes(term)) ||
        (a.probingAnswers?.biz_name?.toLowerCase().includes(term))
      );
    }

    // Business Type
    if (filterBizType !== 'all') {
      filtered = filtered.filter(a => a.probingAnswers?.type_of_business === filterBizType);
    }

    // Min Score
    if (filterMinScore > 0) {
      filtered = filtered.filter(a => (a.totalScore || 0) >= filterMinScore);
    }

    // Date Range
    if (filterDateRange !== 'all') {
      const now = new Date();
      let cutOff: Date;
      if (filterDateRange === '7d') cutOff = subDays(now, 7);
      else if (filterDateRange === '30d') cutOff = subDays(now, 30);
      else cutOff = subDays(now, 90);

      filtered = filtered.filter(a => {
        const created = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt?.seconds * 1000 || 0);
        return isAfter(created, cutOff);
      });
    }

    return filtered;
  }, [assessments, searchTerm, filterBizType, filterMinScore, filterDateRange]);

  const bizTypes = useMemo(() => {
    const types = new Set<string>();
    assessments.forEach(a => {
      if (a.probingAnswers?.type_of_business) types.add(a.probingAnswers.type_of_business);
    });
    return Array.from(types);
  }, [assessments]);

  const handleDownload = () => {
    if (assessments.length === 0) return;
    
    const rows: string[][] = [];
    
    // Build Headers
    const headers = [
        'Submission ID',
        'Timestamp',
        'Enumerator ID',
        'Total Score (%)',
    ];

    // Probing headers
    PROBING_QUESTIONS.forEach(q => headers.push(`PROBE: ${q.text.en}`));
    
    // Domain scores headers
    DOMAINS.forEach(d => headers.push(`DOMAIN: ${d.name.en}`));
    
    // Individual question headers
    MAIN_QUESTIONS.forEach(q => headers.push(`Q: ${q.id} - ${q.text.en.substring(0, 50)}...`));

    rows.push(headers);

    // Build Data Rows
    assessments.forEach(a => {
        const row: string[] = [];
        row.push(a.id || '');
        row.push(a.createdAt ? format(a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt?.seconds * 1000 || 0), 'yyyy-MM-dd HH:mm:ss') : '');
        row.push(a.enumeratorId || '');
        row.push(`${a.totalScore || 0}%`);

        // Probing values
        PROBING_QUESTIONS.forEach(q => {
            const val = a.probingAnswers?.[q.id];
            row.push(Array.isArray(val) ? val.join('; ') : String(val || ''));
        });

        // Domain Scores
        const scores = a.scores || {};
        DOMAINS.forEach(d => {
            const domainScores = Object.entries(scores)
                .filter(([qId]) => qId.startsWith(d.code))
                .map(([, s]) => s as number);
            if (domainScores.length > 0) {
                const avg = domainScores.reduce((sum, s) => sum + s, 0) / domainScores.length;
                row.push(avg.toFixed(2));
            } else {
                row.push('N/A');
            }
        });

        // Question Scores
        MAIN_QUESTIONS.forEach(q => {
            row.push(String(scores[q.id] ?? 'N/A'));
        });

        rows.push(row);
    });

    const csvContent = rows
        .map(row => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(','))
        .join('\n');

    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `SME_Green_Assessments_Full_Export_${format(new Date(), 'yyyyMMdd_HHmm')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const chartData = useMemo(() => {
      if (!filteredAssessments.length) return null;

      // Avg score
      const avgScore = filteredAssessments.reduce((acc, a) => acc + (a.totalScore || 0), 0) / filteredAssessments.length;

      // Score distribution
      const distribution = {
          '0-20': 0, '21-40': 0, '41-60': 0, '61-80': 0, '81-100': 0
      };
      filteredAssessments.forEach(a => {
          const s = a.totalScore || 0;
          if (s <= 20) distribution['0-20']++;
          else if (s <= 40) distribution['21-40']++;
          else if (s <= 60) distribution['41-60']++;
          else if (s <= 80) distribution['61-80']++;
          else distribution['81-100']++;
      });
      const distData = Object.entries(distribution).map(([range, count]) => ({ name: range, count }));

      // Type of business (from probingAnswers.type_of_business)
      const businessTypes: Record<string, number> = {};
      filteredAssessments.forEach(a => {
          const bType = a.probingAnswers?.type_of_business;
          if (bType) {
              businessTypes[bType] = (businessTypes[bType] || 0) + 1;
          }
      });
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF'];
      const bizTypeData = Object.entries(businessTypes).map(([name, value], i) => ({ name, value, color: COLORS[i % COLORS.length] }));
      // Domain breakdown
      const domainScores: Record<string, { total: number, count: number }> = {};
      filteredAssessments.forEach(a => {
          if (a.scores) {
              Object.entries(a.scores as Record<string, number>).forEach(([qId, score]) => {
                  const domainCode = qId.split('-')[0];
                  if (!domainScores[domainCode]) domainScores[domainCode] = { total: 0, count: 0 };
                  domainScores[domainCode].total += score;
                  domainScores[domainCode].count += 1;
              });
          }
      });
      const domainData = Object.entries(domainScores).map(([code, data]) => ({
          name: code,
          avg: Math.round((data.total / data.count) * 20), // Convert 1-5 scale to percentage approx if needed, or keep as 1-5
          value: Number((data.total / data.count).toFixed(2))
      }));

      // Question-level low scores
      const questionScores: Record<string, { total: number, count: number }> = {};
      filteredAssessments.forEach(a => {
          if (a.scores) {
              Object.entries(a.scores as Record<string, number>).forEach(([qId, score]) => {
                  if (score < 0) return;
                  if (!questionScores[qId]) questionScores[qId] = { total: 0, count: 0 };
                  questionScores[qId].total += score;
                  questionScores[qId].count += 1;
              });
          }
      });
      const lowScoringQuestions = Object.entries(questionScores)
        .map(([qId, data]) => ({ qId, avg: data.total / data.count }))
        .sort((a, b) => a.avg - b.avg)
        .slice(0, 5);

      // Volume Trends (last 30 days or based on data)
      const trendMap: Record<string, number> = {};
      filteredAssessments.forEach(a => {
          const created = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt?.seconds * 1000 || 0);
          const dayKey = format(created, 'MMM dd');
          trendMap[dayKey] = (trendMap[dayKey] || 0) + 1;
      });
      const trendData = Object.entries(trendMap).map(([name, count]) => ({ name, count })).slice(-14);

      return {
          avgScore: Math.round(avgScore),
          totalAssessments: filteredAssessments.length,
          distData,
          bizTypeData,
          domainData,
          lowScoringQuestions,
          trendData
      };
  }, [filteredAssessments]);

  if (userProfile?.role !== 'admin') return null;

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-xl mb-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
           <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-green-100">
                    <i className="fa-solid fa-chart-pie"></i>
               </div>
               <div>
                   <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h2>
                   <p className="text-gray-400 font-medium text-sm">Strategic sustainability insights and engine health</p>
               </div>
           </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-grow lg:flex-grow-0">
             <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
             <input 
                type="text" 
                placeholder="Search SMEs..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-100 bg-gray-50/50 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all text-sm w-full lg:w-64"
             />
          </div>
          <button onClick={onViewAssessment} className="px-6 py-3 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95 flex items-center gap-2">
              <i className="fa-solid fa-plus uppercase text-xs opacity-60"></i> New
          </button>
          <button onClick={handleDownload} className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-black rounded-2xl hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2">
              <i className="fa-solid fa-download opacity-60"></i> Export
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 p-5 bg-gray-50 border border-gray-100 rounded-2xl">
          <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Business Type</label>
              <select 
                value={filterBizType}
                onChange={(e) => setFilterBizType(e.target.value)}
                className="w-full py-2 px-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                  <option value="all">All Sectors</option>
                  {bizTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
          </div>
          <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Min Score Threshold</label>
              <div className="flex items-center gap-3">
                  <input 
                    type="range" min="0" max="100" 
                    value={filterMinScore}
                    onChange={(e) => setFilterMinScore(Number(e.target.value))}
                    className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="text-sm font-bold text-indigo-600 w-8">{filterMinScore}%</span>
              </div>
          </div>
          <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Time Period</label>
              <select 
                value={filterDateRange}
                onChange={(e) => setFilterDateRange(e.target.value)}
                className="w-full py-2 px-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                  <option value="all">Lifetime</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
              </select>
          </div>
          <div className="flex items-end">
              <button 
                onClick={() => {
                   setSearchTerm('');
                   setFilterBizType('all');
                   setFilterMinScore(0);
                   setFilterDateRange('all');
                }}
                className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                  <i className="fa-solid fa-rotate-left"></i> Reset Filters
              </button>
          </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col justify-center items-center py-24">
           <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-100 border-t-indigo-600"></div>
           <p className="mt-4 text-gray-400 font-bold tracking-widest uppercase text-[10px]">Syncing cloud data...</p>
        </div>
      ) : chartData ? (
        <div className="space-y-10">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-lg">
                            <i className="fa-solid fa-clipboard-list"></i>
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase">Active</span>
                    </div>
                    <div className="mt-2">
                        <p className="text-3xl font-black text-gray-900">{chartData.totalAssessments}</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Total Records</p>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-lg">
                            <i className="fa-solid fa-gauge-high"></i>
                        </div>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase">Quality</span>
                    </div>
                    <div className="mt-2">
                        <p className="text-3xl font-black text-green-600">{chartData.avgScore}%</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Mean Score</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm md:col-span-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-chart-line text-6xl text-indigo-900"></i>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                         <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-lg">
                            <i className="fa-solid fa-arrow-trend-up"></i>
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Volume Trend (Last 14 Records)</h4>
                    </div>
                    <div className="h-16 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData.trendData}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="count" stroke="#4f46e5" fillOpacity={1} fill="url(#colorCount)" strokeWidth={2} />
                            </AreaChart>
                         </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Domain Distribution */}
                <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm group">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-black text-gray-900 text-lg">Performance by Domain</h3>
                        <i className="fa-solid fa-layer-group text-gray-300 group-hover:text-indigo-400 transition-colors"></i>
                    </div>
                    <div className="h-72">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData.domainData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                                <XAxis type="number" domain={[0, 5]} hide />
                                <YAxis dataKey="name" type="category" width={40} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                                <RechartsTooltip 
                                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                                />
                                <Bar dataKey="value" fill="#10b981" radius={[0, 8, 8, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Business Types Pie */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative group overflow-hidden">
                    <h3 className="font-black text-gray-900 text-lg mb-8">SME Sectors</h3>
                    {chartData.bizTypeData.length > 0 ? (
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={chartData.bizTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={8} stroke="none">
                                        {chartData.bizTypeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                    <Legend iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-72 flex items-center justify-center text-gray-400 italic">No sector data</div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Improvement Areas */}
                <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center text-sm shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                            </div>
                            <h3 className="font-black text-lg tracking-tight">Critical Improvement Areas</h3>
                        </div>
                        
                        <div className="space-y-4">
                            {chartData.lowScoringQuestions.map((item: any, idx: number) => {
                                const q = MAIN_QUESTIONS.find(mq => mq.id === item.qId);
                                return (
                                    <div key={item.qId} className="group/item flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all">
                                        <span className="w-8 h-8 bg-white/10 text-white/50 rounded-full flex items-center justify-center text-xs font-black shrink-0 border border-white/10 group-hover/item:border-red-500/50 group-hover/item:text-red-500 transition-all">{idx + 1}</span>
                                        <div className="flex-grow min-w-0">
                                            <p className="text-sm font-bold truncate opacity-90">{q?.text.en || item.qId}</p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="flex-grow bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-gradient-to-r from-red-600 to-orange-500 h-full" style={{ width: `${(item.avg / 5) * 100}%` }}></div>
                                                </div>
                                                <span className="text-[10px] font-black text-red-400 shrink-0 uppercase tracking-widest">{item.avg.toFixed(1)} / 5.0</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Score Distribution */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm group">
                    <div className="flex justify-between items-center mb-8">
                         <h3 className="font-black text-gray-900 text-lg">Market Distribution</h3>
                         <div className="flex gap-1">
                             {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-indigo-200 rounded-full"></div>)}
                         </div>
                    </div>
                    <div className="h-72">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData.distData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                                <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                                <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40}>
                                    {chartData.distData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 2 ? '#4f46e5' : '#e2e8f0'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Assessment Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest">Recent Submissions</h3>
                  <span className="text-[10px] font-bold text-gray-400">{filteredAssessments.length} Results</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Submission Date</th>
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100">SME Name</th>
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100">Enumerator</th>
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100">Sustainability Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredAssessments.map(a => (
                      <tr key={a.id} className="group hover:bg-indigo-50/30 transition-all cursor-default">
                        <td className="p-5 text-sm text-gray-500 font-medium">
                            {a.createdAt ? format(a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt?.seconds * 1000 || 0), 'MMM dd, yyyy HH:mm') : '—'}
                        </td>
                        <td className="p-5 text-sm font-bold text-gray-900 border-l border-gray-50 group-hover:text-indigo-600 transition-colors">
                            {a.probingAnswers?.biz_name || 'N/A'}
                        </td>
                        <td className="p-5 text-xs font-black text-gray-400 font-mono border-l border-gray-50">
                            {a.enumeratorId}
                        </td>
                        <td className="p-5 border-l border-gray-50">
                            <span className={`px-3 py-1 rounded-full text-xs font-black ${
                                (a.totalScore || 0) > 70 ? 'bg-green-100 text-green-700' : 
                                (a.totalScore || 0) > 40 ? 'bg-orange-100 text-orange-700' : 
                                'bg-red-100 text-red-700'
                            }`}>
                                {a.totalScore}%
                            </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
           <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-300 text-2xl mb-4">
                <i className="fa-solid fa-folder-open"></i>
           </div>
           <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No matching records found</p>
           <button onClick={() => {
                   setSearchTerm('');
                   setFilterBizType('all');
                   setFilterMinScore(0);
                   setFilterDateRange('all');
                }} className="mt-4 text-indigo-600 font-black text-sm hover:underline">Clear all filters</button>
        </div>
      )}
    </div>
  );
};

