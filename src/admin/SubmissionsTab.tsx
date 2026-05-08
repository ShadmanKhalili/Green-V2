import React, { useMemo, useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { format, subDays, isAfter } from 'date-fns';
import { db } from '../../firebase';
import { SubmissionDetailModal } from './SubmissionDetailModal';
import { tsToDate } from './constants';

interface Props {
  assessments: any[];
  onDeleted: (id: string) => void;
}

export const SubmissionsTab: React.FC<Props> = ({ assessments, onDeleted }) => {
  const [search, setSearch] = useState('');
  const [filterBiz, setFilterBiz] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'name'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [selected, setSelected] = useState<any | null>(null);

  const bizTypes = useMemo(() => {
    const s = new Set<string>();
    assessments.forEach(a => {
      if (a.probingAnswers?.P8) s.add(a.probingAnswers.P8);
    });
    return Array.from(s);
  }, [assessments]);

  const filtered = useMemo(() => {
    let list = assessments;

    if (search) {
      const t = search.toLowerCase();
      list = list.filter(a =>
        (a.id?.toLowerCase().includes(t)) ||
        (a.enumeratorId?.toLowerCase().includes(t)) ||
        (a.probingAnswers?.P1?.toLowerCase().includes(t)) ||
        (a.probingAnswers?.biz_name?.toLowerCase().includes(t))
      );
    }

    if (filterBiz !== 'all') {
      list = list.filter(a => a.probingAnswers?.P8 === filterBiz);
    }

    if (filterMinScore > 0) {
      list = list.filter(a => (a.totalScore || 0) >= filterMinScore);
    }

    if (filterDate !== 'all') {
      const cutoff =
        filterDate === '7d' ? subDays(new Date(), 7) :
        filterDate === '30d' ? subDays(new Date(), 30) :
        subDays(new Date(), 90);
      list = list.filter(a => isAfter(tsToDate(a.createdAt), cutoff));
    }

    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'date') {
        cmp = tsToDate(a.createdAt).getTime() - tsToDate(b.createdAt).getTime();
      } else if (sortBy === 'score') {
        cmp = (a.totalScore || 0) - (b.totalScore || 0);
      } else {
        cmp = (a.probingAnswers?.P1 || a.probingAnswers?.biz_name || '').localeCompare(b.probingAnswers?.P1 || b.probingAnswers?.biz_name || '');
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [assessments, search, filterBiz, filterDate, filterMinScore, sortBy, sortDir]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'assessments', id));
      onDeleted(id);
      setSelected(null);
    } catch (err: any) {
      console.error('Failed to delete submission:', err);
      alert(`Failed to delete: ${err.message || err}`);
    }
  };

  const toggleSort = (col: 'date' | 'score' | 'name') => {
    if (sortBy === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortDir('desc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl">
        <div className="lg:col-span-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Search</label>
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Name, enumerator id, doc id..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Sector (P8)</label>
          <select
            value={filterBiz}
            onChange={e => setFilterBiz(e.target.value)}
            className="w-full py-2 px-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All sectors</option>
            {bizTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Date range</label>
          <select
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            className="w-full py-2 px-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Lifetime</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Min score: {filterMinScore}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filterMinScore}
            onChange={e => setFilterMinScore(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg accent-indigo-600"
          />
        </div>
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-black text-gray-900">{filtered.length}</span> of{' '}
          <span className="font-black">{assessments.length}</span> submissions
        </p>
        {(search || filterBiz !== 'all' || filterDate !== 'all' || filterMinScore > 0) && (
          <button
            onClick={() => { setSearch(''); setFilterBiz('all'); setFilterDate('all'); setFilterMinScore(0); }}
            className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600"
          >
            <i className="fa-solid fa-rotate-left mr-1"></i> Reset
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 cursor-pointer hover:text-indigo-600" onClick={() => toggleSort('date')}>
                  Date {sortBy === 'date' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100 cursor-pointer hover:text-indigo-600" onClick={() => toggleSort('name')}>
                  SME Name {sortBy === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100">Sector</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100">Location</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100 cursor-pointer hover:text-indigo-600" onClick={() => toggleSort('score')}>
                  Score {sortBy === 'score' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100">Enumerator</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(a => {
                const created = tsToDate(a.createdAt);
                const score = a.totalScore || 0;
                return (
                  <tr
                    key={a.id}
                    onClick={() => setSelected(a)}
                    className="group hover:bg-indigo-50/50 cursor-pointer transition-all"
                  >
                    <td className="p-4 text-sm text-gray-500 font-medium whitespace-nowrap">
                      {a.createdAt ? format(created, 'MMM dd, yyyy HH:mm') : '—'}
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-900 border-l border-gray-50 group-hover:text-indigo-600 transition-colors">
                      {a.probingAnswers?.P1 || a.probingAnswers?.biz_name || 'Untitled'}
                    </td>
                    <td className="p-4 text-xs text-gray-600 border-l border-gray-50">
                      {a.probingAnswers?.P8 || '—'}
                    </td>
                    <td className="p-4 text-xs text-gray-600 border-l border-gray-50">
                      {a.probingAnswers?.P2 || '—'}
                    </td>
                    <td className="p-4 border-l border-gray-50">
                      <span className={`px-3 py-1 rounded-full text-xs font-black ${
                        score > 70 ? 'bg-green-100 text-green-700' :
                        score > 40 ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {score}%
                      </span>
                    </td>
                    <td className="p-4 text-xs font-mono text-gray-400 border-l border-gray-50">
                      {a.enumeratorId?.slice(0, 10) || '—'}
                    </td>
                    <td className="p-4 border-l border-gray-50 text-right">
                      <i className="fa-solid fa-arrow-right text-gray-300 group-hover:text-indigo-600 transition-colors"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center text-gray-400 mb-3">
              <i className="fa-solid fa-folder-open text-xl"></i>
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              {assessments.length === 0 ? 'No submissions yet' : 'No matches for current filters'}
            </p>
          </div>
        )}
      </div>

      {/* Detail modal */}
      <SubmissionDetailModal
        submission={selected}
        onClose={() => setSelected(null)}
        onDelete={handleDelete}
      />
    </div>
  );
};
