

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Language, Indicator, Pillar, ProbingQuestion, ProbingAnswers, Domain, MainQuestion } from './types';
import { MAIN_QUESTIONS, DOMAINS } from './questionBank';
import { SCORING_OPTIONS, PROBING_QUESTIONS, SCORE_INTERPRETATIONS, SECTOR_BENCHMARKS, KEY_RESOURCES } from './constants';
import { GoogleGenAI } from "@google/genai";
import { useAuth } from './AuthContext';
import { AdminDashboard } from './src/AdminDashboard';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';

declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

// --- Helper functions ---
const getInitialScores = (questions: MainQuestion[]) => {
  return questions.reduce<{ [key: string]: number }>((acc, question) => {
    acc[question.id] = -2; // -2 represents an unanswered question, -1 will be N/A
    return acc;
  }, {});
};

const getWeightNumber = (priority: WeightPriority): number => {
    switch (priority) {
        case 'Very High': return 4;
        case 'High': return 3;
        case 'Medium': return 2;
        case 'Low': return 1;
        case 'Pathway': return 0; // Exclude from core score 
        default: return 1;
    }
};

const generateCustomAssessmentData = (answers: ProbingAnswers) => {
    // Determine which questions apply based on routing conditions
    const applicableQuestions = MAIN_QUESTIONS.filter(q => {
        const isMatched = q.routingCondition(answers);
        return isMatched;
    });
    
    console.log(`Routing Logic: ${applicableQuestions.length}/${MAIN_QUESTIONS.length} questions matched for profile.`);
    
    // Group by Domain
    const groupedByDomain: { domain: Domain; questions: MainQuestion[] }[] = [];
    DOMAINS.forEach(domain => {
        const questionsInDomain = applicableQuestions.filter(q => q.domain.includes(domain.code));
        if (questionsInDomain.length > 0) {
            groupedByDomain.push({ domain, questions: questionsInDomain });
        }
    });

    return { applicableQuestions, groupedByDomain };
};

// --- UI Components ---

const ProbingQuestionComponent: React.FC<{ index: number; question: ProbingQuestion; value: string | string[]; onChange: (id: string, value: any) => void; language: Language; isRequired: boolean; }> = ({ index, question, value, onChange, language, isRequired }) => {
    let isAnswered = false;
    if (question.type === 'checkbox') {
        isAnswered = Array.isArray(value) && value.length > 0;
    } else {
        isAnswered = typeof value === 'string' && value !== 'default' && value.trim() !== '';
    }

    return (
        <div className={`mb-6 p-5 rounded-xl border-l-4 transition-all duration-300 shadow-sm ${
            isAnswered 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}>
            <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-start gap-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 mt-0.5 shadow-sm ${
                    isAnswered ? 'bg-green-500 text-white' : 'bg-white text-gray-600 border border-gray-300'
                }`}>
                    {isAnswered ? <i className="fa-solid fa-check"></i> : index}
                </span>
                <span>
                    {question.text[language]}
                    {isRequired && <span className="text-red-500 ml-1.5 align-top text-xl" title={language === 'en' ? 'Required' : 'আবশ্যক'}>*</span>}
                </span>
            </label>
            <div className="ml-11">
                {question.type === 'text' && (
                    <input 
                        type="text" 
                        value={value as string} 
                        onChange={e => onChange(question.id, e.target.value)}
                        className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                            isAnswered ? 'border-green-300 bg-white' : 'border-gray-300'
                        }`}
                        placeholder={language === 'en' ? 'Type your answer here...' : 'আপনার উত্তর এখানে লিখুন...'}
                    />
                )}
                {question.type === 'select' && question.options && (
                    <select 
                        value={value as string || 'default'} 
                        onChange={e => onChange(question.id, e.target.value)}
                        className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                            isAnswered ? 'border-green-300 bg-white' : 'border-gray-300'
                        }`}
                    >
                        {question.options.map(opt => <option key={opt.value} value={opt.value}>{opt.text[language]}</option>)}
                    </select>
                )}
                {question.type === 'checkbox' && question.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {question.options.map(opt => {
                            const isChecked = (value as string[]).includes(opt.value);
                            return (
                                <label key={opt.value} className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
                                    isChecked ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-green-300'
                                }`}>
                                    <div className="flex h-6 items-center">
                                        <input 
                                            type="checkbox"
                                            value={opt.value}
                                            checked={isChecked}
                                            onChange={e => {
                                                const currentValues = (value as string[]) || [];
                                                const newValues = e.target.checked 
                                                    ? [...currentValues, opt.value] 
                                                    : currentValues.filter(v => v !== opt.value);
                                                onChange(question.id, newValues);
                                            }}
                                            className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />
                                    </div>
                                    <div className="ml-3 text-base">
                                        <span className={isChecked ? 'text-green-800 font-medium' : 'text-gray-700'}>{opt.text[language]}</span>
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

const ProbingQuestionsForm: React.FC<{ onComplete: (answers: ProbingAnswers) => void; language: Language; isAdmin?: boolean; }> = ({ onComplete, language, isAdmin }) => {
    const [answers, setAnswers] = useState<ProbingAnswers>({});

    const handleAnswerChange = (id: string, value: any) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleAutoFill = () => {
        const dummyAnswers: ProbingAnswers = {};
        const bizNames = ['Green Eco Textiles', 'Dhaka Solar Solutions', 'Rural Agro Care', 'Evergreen Garments', 'Coastal Aquatics', 'Sustainable Leather Ltd', 'Bio-Craft Bangladesh'];
        const randomBizName = bizNames[Math.floor(Math.random() * bizNames.length)] + ' ' + Math.floor(Math.random() * 100);

        PROBING_QUESTIONS.forEach(q => {
             if (q.type === 'text') {
                 if (q.id === 'P1') {
                     dummyAnswers[q.id] = randomBizName;
                 } else {
                     dummyAnswers[q.id] = 'Auto filled text ' + Math.floor(Math.random() * 1000);
                 }
             }
             if (q.type === 'select' && q.options) {
                 const validOptions = q.options.filter(o => o.value !== 'default');
                 if (validOptions.length > 0) {
                     const randomIndex = Math.floor(Math.random() * validOptions.length);
                     dummyAnswers[q.id] = validOptions[randomIndex].value;
                 }
             }
             if (q.type === 'checkbox' && q.options) {
                 const count = Math.floor(Math.random() * q.options.length) + 1;
                 const shuffled = [...q.options].sort(() => 0.5 - Math.random());
                 dummyAnswers[q.id] = shuffled.slice(0, count).map(o => o.value);
             }
        });
        setAnswers(dummyAnswers);
    };

    const visibleQuestions = useMemo(() => {
        return PROBING_QUESTIONS.filter(q => {
            if (!q.dependsOn) return true;
            return q.dependsOn(answers);
        });
    }, [answers]);

    const requiredQuestions = useMemo(() => visibleQuestions.filter(q => q.type === 'select' || q.type === 'text'), [visibleQuestions]);
    const answeredCount = useMemo(() => requiredQuestions.filter(q => {
        const val = answers[q.id];
        if (!val || val === 'default') return false;
        if (typeof val === 'string' && val.trim() === '') return false;
        return true;
    }).length, [answers, requiredQuestions]);
    const isComplete = answeredCount === requiredQuestions.length;
    const remainingCount = requiredQuestions.length - answeredCount;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto p-4 sm:p-8 hover-effects-enabled"
        >
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                    <div 
                        className="h-full bg-green-500 transition-all duration-500 ease-out"
                        style={{ width: `${requiredQuestions.length > 0 ? (answeredCount / requiredQuestions.length) * 100 : 0}%` }}
                    ></div>
                </div>

                <div className="flex justify-between items-center mt-2 mb-3">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight flex-grow text-center">{language === 'en' ? 'Tell us about your business' : 'আপনার ব্যবসা সম্পর্কে আমাদের বলুন'}</h2>
                    {isAdmin && (
                        <button onClick={handleAutoFill} className="shrink-0 px-3 py-1 bg-purple-100 text-purple-700 rounded-md shadow-sm hover:bg-purple-200 font-bold text-sm">
                            <i className="fa-solid fa-bolt mr-1"></i> Auto-Fill
                        </button>
                    )}
                </div>
                <p className="text-center text-gray-600 mb-2 text-lg">{language === 'en' ? 'Your answers will help us create a personalized assessment.' : 'আপনার উত্তর আমাদের একটি ব্যক্তিগত মূল্যায়ন তৈরি করতে সাহায্য করবে।'}</p>
                <div className="flex justify-center mb-8">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-sm font-semibold rounded-full border border-green-200">
                        <i className="fa-solid fa-tasks"></i> {answeredCount} / {requiredQuestions.length} {language === 'en' ? 'completed' : 'সম্পন্ন হয়েছে'}
                    </span>
                </div>
                
                <div className="space-y-4">
                    {visibleQuestions.map((q, index) => {
                        const isRequired = q.type === 'select' || q.type === 'text';
                        return (
                            <ProbingQuestionComponent key={q.id} index={index + 1} question={q} value={answers[q.id] || (q.type === 'checkbox' ? [] : (q.type === 'select' ? 'default' : ''))} onChange={handleAnswerChange} language={language} isRequired={isRequired} />
                        )
                    })}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <button 
                        onClick={() => onComplete(answers)}
                        disabled={!isComplete}
                        className={`w-full py-4 px-6 font-bold text-xl rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-3 ${
                            isComplete 
                                ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-1' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {isComplete ? (
                            <>
                                <span>{language === 'en' ? 'Generate My Assessment' : 'আমার মূল্যায়ন তৈরি করুন'}</span>
                                <i className="fa-solid fa-arrow-right"></i>
                            </>
                        ) : (
                            <>
                                <span>
                                    {language === 'en' 
                                        ? `Please answer ${remainingCount} more required question${remainingCount !== 1 ? 's' : ''}` 
                                        : `অনুগ্রহ করে আরও ${remainingCount}টি আবশ্যক প্রশ্নের উত্তর দিন`}
                                </span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const QuestionRow: React.FC<{ 
    index: number;
    question: MainQuestion; 
    currentScore: number; 
    onScoreChange: (id: string, score: number) => void; 
    language: Language; 
}> = ({ index, question, currentScore, onScoreChange, language }) => {
    const isAnswered = currentScore !== -2;

    return (
        <div className={`grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 items-center p-5 rounded-xl border-l-4 transition-all duration-300 shadow-sm mb-4 ${
            isAnswered 
                ? 'border-green-500 bg-green-50/20' 
                : 'border-blue-300 bg-blue-50/20 hover:border-blue-400'
        }`}>
            <div className="flex items-start gap-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 mt-0.5 shadow-sm ${
                    isAnswered ? 'bg-green-500 text-white' : 'bg-white text-blue-700 border border-blue-200'
                }`}>
                    {isAnswered ? <i className="fa-solid fa-check"></i> : index}
                </span>
                <div>
                    <label className="font-semibold text-gray-800 text-lg cursor-pointer">
                        {question.text[language]}
                        <span className="text-red-500 ml-1.5 align-top text-xl" title={language === 'en' ? 'Required' : 'আবশ্যক'}>*</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-1 capitalize"><i className="fa-solid fa-weight-hanging mr-1"></i>{language === 'en' ? 'Weight:' : 'ওজন:'} {question.weightPriority}</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
               <select 
                   value={currentScore} 
                   onChange={(e) => onScoreChange(question.id, parseInt(e.target.value, 10))} 
                   className={`flex-grow w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                       isAnswered ? 'border-green-300 bg-white' : 'border-gray-300'
                   }`}
               >
                 <option value="-2" disabled>{language === 'en' ? 'Select an option...' : 'একটি বিকল্প নির্বাচন করুন...'}</option>
                 {SCORING_OPTIONS.map(option => (
                    <option key={option.score} value={option.score}>{option.text[language]}</option>
                 ))}
               </select>
               <div className="w-full sm:w-28 shrink-0 text-center bg-white border border-gray-200 shadow-sm rounded-lg py-2">
                    <span className="font-bold text-xl text-green-700">{currentScore > -1 ? currentScore : (currentScore === -1 ? 'N/A' : '-')}</span>
                    <span className="text-gray-500 font-medium"> / 4</span>
               </div>
            </div>
        </div>
    );
};

const DomainCard: React.FC<{ 
    domainGroup: { domain: Domain; questions: MainQuestion[] }; 
    scores: { [key: string]: number }; 
    onScoreChange: (id: string, score: number) => void; 
    language: Language;
}> = ({ domainGroup, scores, onScoreChange, language }) => {
  // Calculate score
  let totalScore = 0;
  let maxPossible = 0;
  
  domainGroup.questions.forEach(q => {
      const score = scores[q.id];
      if (score > -1 && q.weightPriority !== 'Pathway') {
          const weight = getWeightNumber(q.weightPriority);
          totalScore += (score * weight);
          maxPossible += (4 * weight); // Max score per question is 4
      }
  });

  const displayScore = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-shadow hover:shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-2xl shrink-0">
               <i className={domainGroup.domain.icon}></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-800">{domainGroup.domain.name[language]}</h2>
            <p className="text-gray-500">{domainGroup.questions.length} Questions</p>
          </div>
        </div>
        <div className="text-right">
            <p className="text-3xl font-bold text-green-700">{displayScore}%</p>
        </div>
      </div>
      <div className="space-y-4">
        {domainGroup.questions.map((question, index) => (
          <QuestionRow 
            key={question.id} 
            index={index + 1}
            question={question} 
            currentScore={scores[question.id] ?? -2} 
            onScoreChange={onScoreChange} 
            language={language}
          />
        ))}
      </div>
    </div>
  );
};

const ScoreGauge: React.FC<{ score: number; }> = ({ score }) => {
    const interpretation = SCORE_INTERPRETATIONS.find(interp => score >= interp.minScore)!;
    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center w-48 h-48">
            <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" strokeWidth="16" className="text-gray-200" fill="transparent" />
                <circle cx="60" cy="60" r="52" strokeWidth="16" fill="transparent" className={`${interpretation.textColor} transition-all duration-1000 ease-out`} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
            </svg>
            <span className="absolute text-5xl font-bold text-gray-700">{score}</span>
        </div>
    );
};

const ResultsSummaryCard: React.FC<{ totalScore: number; language: Language; }> = ({ totalScore, language }) => {
  const interpretation = useMemo(() => {
    const found = SCORE_INTERPRETATIONS.find(interp => totalScore >= interp.minScore);
    return found || SCORE_INTERPRETATIONS[SCORE_INTERPRETATIONS.length - 1];
  }, [totalScore]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 my-8 border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
        <div className={`h-full ${interpretation.colorClass} transition-all duration-1000`} style={{ width: `${totalScore}%` }}></div>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="shrink-0 relative">
          <ScoreGauge score={totalScore} />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
             <span className={`px-4 py-1.5 rounded-full text-sm font-black text-white shadow-lg ${interpretation.colorClass} border-2 border-white animate-bounce`}>
                {interpretation.rating.level[language]}
             </span>
          </div>
        </div>
        
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
            {language === 'en' ? 'Assessment Results' : 'মূল্যায়ন ফলাফল'}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
            {interpretation.rating.meaning[language]}
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-green-50 rounded-2xl border border-green-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
              <div>
                <h4 className="font-black text-green-900 text-sm uppercase tracking-wider mb-1">{language === 'en' ? 'Key Action' : 'প্রধান পদক্ষেপ'}</h4>
                <p className="text-green-800 font-medium text-sm leading-relaxed">{interpretation.rating.actions[language]}</p>
              </div>
            </div>
            
            <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <i className="fa-solid fa-chart-simple"></i>
              </div>
              <div>
                <h4 className="font-black text-blue-900 text-sm uppercase tracking-wider mb-1">{language === 'en' ? 'SME Average' : 'এসএমই গড়'}</h4>
                <p className="text-blue-800 font-medium text-sm">Most businesses score between 40-55. You are doing {totalScore > 50 ? 'better than average!' : 'well, with room to grow.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoSection: React.FC<{ language: Language; }> = ({ language }) => (
    <div className="bg-white rounded-xl shadow-lg p-8 my-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">{language === 'en' ? 'Implementation Guide & Resources' : 'বাস্তবায়ন নির্দেশিকা ও সম্পদ'}</h2>
        <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{language === 'en' ? 'Key Resources in Bangladesh' : 'বাংলাদেশে মূল সম্পদ'}</h3>
            <ul className="list-disc list-inside space-y-2">
                {KEY_RESOURCES.map(res => (<li key={res.name.en} className="text-gray-600"><span className="font-semibold">{res.name[language]}:</span> {res.contact}</li>))}
            </ul>
        </div>
    </div>
);

const AIRecommendations: React.FC<{ scores: { [key: string]: number }; assessmentData: { domain: Domain; questions: MainQuestion[] }[]; probingAnswers: ProbingAnswers; language: Language; isGuest: boolean; }> = ({ scores, assessmentData, probingAnswers, language, isGuest }) => {
    const [recommendations, setRecommendations] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const generateRecommendations = async () => {
        if (isGuest) {
             setLoading(false);
             return;
        }

        setLoading(true);
        setError('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

            const lowScoringAnswers = assessmentData
                .flatMap(p => p.questions)
                .filter(question => {
                    const score = scores[question.id];
                    return typeof score === 'number' && score >= 0 && score <= 2;
                })
                .map(question => {
                    const score = scores[question.id];
                    const answer = SCORING_OPTIONS.find(sg => sg.score === score);
                    return `- Question: ${question.text.en}\n  - Answer (Score ${score}): ${answer?.text.en}`;
                })
                .join('\n');
            
            const businessProfile = Object.entries(probingAnswers)
                .map(([key, value]) => {
                    const question = PROBING_QUESTIONS.find(q => q.id === key);
                    return `- ${question?.text.en}: ${Array.isArray(value) ? value.join(', ') : value}`;
                })
                .join('\n');

            const prompt = `You are an expert consultant for small and medium-sized enterprises (SMEs) in Bangladesh, specializing in green and sustainable business practices.

A business has just completed a sustainability assessment. Based on their profile and low-scoring answers below, provide a set of 3-5 actionable, prioritized recommendations in ${language === 'bn' ? 'Bengali' : 'English'}.

Crucially, tailor every recommendation specifically to the provided "Business Profile". For example, take into account their sector (e.g., manufacturing vs. service), location (urban vs. rural), their primary customer base, size of the business, and the specific resources they consume. The solutions must be practical and relevant to their specific constraints and context.

For each recommendation, explain why it's important and suggest the first practical step they can take. Focus on low-cost, high-impact suggestions. Format the response as Markdown with clear headings and bullet points.

Business Profile:
${businessProfile}

Assessment Results (Areas for Improvement):
${lowScoringAnswers}

Now, provide your expert recommendations tailored to the specific business profile.`;

            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
            });

            setRecommendations(response.text || '');
        } catch (e) {
            console.error(e);
            setError(language === 'en' ? 'Failed to generate recommendations. Please try again later.' : 'সুপারিশ তৈরি করতে ব্যর্থ। অনুগ্রহ করে稍পরে আবার চেষ্টা করুন।');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        generateRecommendations();
    }, [assessmentData, scores, probingAnswers, language, isGuest]);

    if (isGuest) {
         return (
            <div className="bg-yellow-50 rounded-xl shadow-lg border border-yellow-200 p-8 my-8 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-3xl mb-4">
                    <i className="fa-solid fa-lock"></i>
                </div>
                <h2 className="text-2xl font-bold text-yellow-800 mb-2">{language === 'en' ? 'Unlock AI Recommendations' : 'AI সুপারিশগুলি আনলক করুন'}</h2>
                <p className="text-yellow-700 max-w-md">
                   {language === 'en' 
                     ? 'Log in to receive personalized, AI-driven recommendations tailored specifically to your business profile and assessment results.' 
                     : 'আপনার প্রোফাইল এবং ফলাফলের জন্য বিশেষায়িত এআই সুপারিশ পেতে লগ ইন করুন।'}
                </p>
            </div>
         );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden my-12"
        >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse"></div>
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/20 transform rotate-3">
                       <i className="fa-solid fa-wand-magic-sparkles"></i>
                   </div>
                   <div className="text-center md:text-left">
                       <h2 className="text-3xl font-black tracking-tight">{language === 'en' ? 'SME Green Growth Strategies' : 'এসএমই গ্রিন গ্রোথ কৌশল'}</h2>
                       <p className="text-blue-100 mt-2 font-medium">
                           {language === 'en' 
                             ? 'AI-powered insights specifically tailored for your business context in Bangladesh.' 
                             : 'আপনার ব্যবসার প্রেক্ষাপটে বিশেষভাবে তৈরি এআই-চালিত অন্তর্দৃষ্টি।'}
                       </p>
                   </div>
               </div>
            </div>

            <div className="p-8 sm:p-10">
                {loading && (
                     <div className="flex flex-col items-center justify-center py-16">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-blue-600 text-2xl animate-pulse">
                                <i className="fa-solid fa-brain"></i>
                            </div>
                        </div>
                        <p className="mt-8 text-gray-500 font-bold tracking-widest uppercase text-xs animate-pulse">
                            {language === 'en' ? 'Crafting your personalized roadmap...' : 'আপনার ব্যক্তিগত রোডম্যাপ তৈরি করা হচ্ছে...'}
                        </p>
                    </div>
                )}
                
                {error && (
                    <div className="p-6 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-xl shrink-0">
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <div>
                            <p className="font-bold">{language === 'en' ? 'Something went wrong' : 'কিছু ভুল হয়েছে'}</p>
                            <p className="text-sm opacity-90">{error}</p>
                        </div>
                    </div>
                )}

                {!loading && !error && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="markdown-recommendations prose prose-lg prose-slate max-w-none prose-headings:text-indigo-900 prose-headings:font-black prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-indigo-700"
                    >
                        <Markdown>{recommendations}</Markdown>
                    </motion.div>
                )}
            </div>
            
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Model: Gemini 3 Flash Preview</span>
                <div className="flex gap-1">
                    {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-blue-200 rounded-full"></div>)}
                </div>
            </div>
        </motion.div>
    );
};

const AssessmentProgress: React.FC<{ 
    scores: { [key: string]: number }; 
    assessmentData: { domain: Domain; questions: MainQuestion[] }[]; 
    language: Language; 
}> = ({ scores, assessmentData, language }) => {
    const totalQuestions = useMemo(() => assessmentData.flatMap(p => p.questions).length, [assessmentData]);
    const answeredQuestions = useMemo(() => Object.values(scores).filter(score => score > -2).length, [scores]);
    const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

    return (
        <div className="sticky top-16 z-20 bg-white/80 backdrop-blur-sm shadow-md p-4 mb-8 rounded-lg">
            <div className="flex justify-between items-center mb-2 text-sm md:text-base">
                <h3 className="font-bold text-green-800">{language === 'en' ? 'Progress' : 'অগ্রগতি'}</h3>
                <span className="font-semibold text-gray-700">{answeredQuestions} / {totalQuestions} {language === 'en' ? 'Answered' : 'উত্তর'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                    className="bg-green-600 h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};

const AssessmentScreen: React.FC<{
    assessmentData: { domain: Domain; questions: MainQuestion[] }[];
    scores: { [key: string]: number };
    onScoreChange: (id: string, score: number) => void;
    onComplete: () => void;
    language: Language;
    isAdmin: boolean;
}> = ({ assessmentData, scores, onScoreChange, onComplete, language, isAdmin }) => {
    
    const { isComplete, remainingCount } = useMemo(() => {
        let unanswered = 0;
        for (const group of assessmentData) {
            for (const q of group.questions) {
                if (scores[q.id] === undefined || scores[q.id] === -2) {
                    unanswered++;
                }
            }
        }
        return { isComplete: unanswered === 0, remainingCount: unanswered };
    }, [assessmentData, scores]);

    const handleAutoFill = () => {
         for (const group of assessmentData) {
             for (const q of group.questions) {
                 if (scores[q.id] === undefined || scores[q.id] === -2) {
                     // Randomly select 1 to 4 with a slight bias towards higher scores to look "better"
                     const randomValue = Math.random();
                     let score = 1;
                     if (randomValue > 0.7) score = 4;
                     else if (randomValue > 0.3) score = 3;
                     else if (randomValue > 0.1) score = 2;
                     
                     onScoreChange(q.id, score);
                 }
             }
         }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
        >
            <AssessmentProgress scores={scores} assessmentData={assessmentData} language={language} />
            <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-green-50/50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg">
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{language === 'en' ? 'Personalized Assessment' : 'ব্যক্তিগত মূল্যায়ন'}</h2>
                        <p className="text-sm text-gray-500">{language === 'en' ? 'Questions matched to your business profile' : 'আপনার ব্যবসার প্রোফাইলের সাথে সামঞ্জস্যপূর্ণ প্রশ্নগুলি'}</p>
                    </div>
                </div>
                {isAdmin && (
                    <button onClick={handleAutoFill} className="shrink-0 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg shadow-sm hover:bg-purple-200 font-bold transition-colors">
                        <i className="fa-solid fa-bolt mr-2"></i> Admin Auto-Fill
                    </button>
                )}
            </div>
            {assessmentData.map(group => (
                <DomainCard 
                    key={group.domain.code} 
                    domainGroup={group} 
                    scores={scores} 
                    onScoreChange={onScoreChange} 
                    language={language}
                />
            ))}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                    onClick={onComplete}
                    disabled={!isComplete}
                    className={`w-full py-4 px-6 font-bold text-xl rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-3 ${
                         isComplete 
                             ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-1' 
                             : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {isComplete ? (
                         <>
                             <span>{language === 'en' ? 'Finish & See Results' : 'শেষ করুন এবং ফলাফল দেখুন'}</span>
                             <i className="fa-solid fa-arrow-right"></i>
                         </>
                    ) : (
                         <span>
                             {language === 'en' 
                                 ? `Please answer ${remainingCount} more required question${remainingCount !== 1 ? 's' : ''}` 
                                 : `অনুগ্রহ করে আরও ${remainingCount}টি আবশ্যক প্রশ্নের উত্তর দিন`}
                         </span>
                    )}
                </button>
            </div>
        </motion.div>
    );
};

const DetailedReportTable: React.FC<{ assessmentData: { domain: Domain; questions: MainQuestion[] }[]; scores: Record<string, number>; language: Language }> = ({ assessmentData, scores, language }) => {
    return (
        <div className="mt-12 pt-12 border-t border-gray-200">
            <h3 className="text-2xl font-black text-gray-900 mb-8 border-l-4 border-indigo-600 pl-4">
                {language === 'en' ? 'Detailed Analysis Report' : 'বিস্তারিত বিশ্লেষণ রিপোর্ট'}
            </h3>
            <div className="space-y-12">
                {assessmentData.map(domain => (
                    <div key={domain.domain.code} className="break-inside-avoid">
                        <h4 className="text-lg font-bold text-indigo-900 mb-4 bg-indigo-50 p-3 rounded-lg flex justify-between items-center">
                            <span>{domain.domain.name[language]}</span>
                            <span className="text-sm font-black opacity-50">#{domain.domain.code}</span>
                        </h4>
                        <div className="overflow-hidden border border-gray-100 rounded-xl">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="p-4 font-black uppercase tracking-widest text-[10px] text-gray-400 w-1/2">{language === 'en' ? 'Question' : 'প্রশ্ন'}</th>
                                        <th className="p-4 font-black uppercase tracking-widest text-[10px] text-gray-400">{language === 'en' ? 'Score' : 'স্কোর'}</th>
                                        <th className="p-4 font-black uppercase tracking-widest text-[10px] text-gray-400">{language === 'en' ? 'Status' : 'অবস্থা'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {domain.questions.map(q => {
                                        const score = scores[q.id];
                                        const option = SCORING_OPTIONS.find(o => o.score === score);
                                        return (
                                            <tr key={q.id}>
                                                <td className="p-4 text-gray-700 font-medium">{q.text[language]}</td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-xs ${
                                                        score >= 3 ? 'bg-green-100 text-green-700' :
                                                        score >= 2 ? 'bg-orange-100 text-orange-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                        {score}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                                                    {option?.text[language].split('-')[1]?.trim() || option?.text[language]}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ResultsPage: React.FC<{
    totalScore: number;
    scores: { [key: string]: number };
    assessmentData: { domain: Domain; questions: MainQuestion[] }[];
    probingAnswers: ProbingAnswers;
    onStartOver: () => void;
    language: Language;
    isGuest: boolean;
}> = ({ totalScore, scores, assessmentData, probingAnswers, onStartOver, language, isGuest }) => {
    const [isExporting, setIsExporting] = useState(false);
    
    // Default to the lowest interpretation if none match
    const interpretation = useMemo(() => {
        const found = SCORE_INTERPRETATIONS.find(interp => totalScore >= interp.minScore);
        return found || SCORE_INTERPRETATIONS[SCORE_INTERPRETATIONS.length - 1];
    }, [totalScore]);

    const domainScores = useMemo(() => {
        return assessmentData.map(group => {
            let sumScore = 0;
            let sumMax = 0;
            group.questions.forEach(q => {
               const score = scores[q.id];
               if (score > -1 && q.weightPriority !== 'Pathway') {
                   const weight = getWeightNumber(q.weightPriority);
                   sumScore += (score * weight);
                   sumMax += (4 * weight);
               }
            });
            const percent = sumMax > 0 ? Math.round((sumScore / sumMax) * 100) : 0;
            return {
                title: group.domain.name[language],
                score: sumScore,
                maxScore: sumMax,
                percent,
            };
        });
    }, [assessmentData, scores, language]);

    const handleExportCSV = () => {
        const rows: string[][] = [];
        
        // 1. Business Profile Header
        rows.push([language === 'en' ? 'BUSINESS PROFILE' : 'ব্যবসা প্রোফাইল']);
        Object.entries(probingAnswers).forEach(([key, value]) => {
            const question = PROBING_QUESTIONS.find(q => q.id === key);
            rows.push([
                question?.text[language] || key,
                Array.isArray(value) ? value.join('; ') : String(value)
            ]);
        });
        rows.push([]); // Empty row separator

        // 2. Domain Scores
        rows.push([
            language === 'en' ? 'Domain' : 'বিভাগ',
            language === 'en' ? 'Raw Score' : 'র স্কোর',
            language === 'en' ? 'Max Possible' : 'সর্বোচ্চ স্কোর',
            language === 'en' ? 'Percentage' : 'শতাংশ'
        ]);
        domainScores.forEach(d => {
            rows.push([d.title, String(d.score), String(d.maxScore), `${d.percent}%`]);
        });
        rows.push([]);

        // 3. Detailed Question Responses
        rows.push([
            language === 'en' ? 'Question ID' : 'প্রশ্ন আইডি',
            language === 'en' ? 'Question Text' : 'প্রশ্নের বিবরণ',
            language === 'en' ? 'Score' : 'স্কোর',
            language === 'en' ? 'Interpretation' : 'ব্যাখ্যা'
        ]);
        
        assessmentData.forEach(domain => {
            domain.questions.forEach(q => {
                const score = scores[q.id];
                const option = SCORING_OPTIONS.find(o => o.score === score);
                rows.push([
                    q.id,
                    q.text[language],
                    String(score),
                    option?.text[language] || ''
                ]);
            });
        });
        rows.push([]);

        // 4. Overall Result
        rows.push([language === 'en' ? 'OVERALL RATING' : 'সামগ্রিক রেটিং']);
        rows.push([language === 'en' ? 'Total Score (%)' : 'মোট স্কোর (%)', `${totalScore}%`]);
        rows.push([language === 'en' ? 'Assessment Rating' : 'মূল্যায়ন রেটিং', interpretation.rating.level[language]]);
        rows.push([]);

        // 5. AI Recommendations (Simplified text)
        if (recommendations) {
            rows.push([language === 'en' ? 'AI RECOMMENDATIONS' : 'এআই সুপারিশ']);
            // Strip markdown for simplified CSV display or just dump it
            rows.push([recommendations.replace(/#/g, '').replace(/\*/g, '').trim()]);
        }

        // Convert to CSV string and download
        const csvString = rows
            .map(row => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(','))
            .join('\n');
    
        const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `GreenBiz_Report_${probingAnswers.biz_name || 'Assessment'}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const handleExportPDF = () => {
        if (!window.jspdf || !window.html2canvas) {
            alert(language === 'en' ? 'PDF generation library is not loaded. Please refresh and try again.' : 'পিডিএফ তৈরির লাইব্রেরি লোড করা হয়নি। অনুগ্রহ করে রিফ্রেশ করে আবার চেষ্টা করুন।');
            return;
        }
        const { jsPDF } = window.jspdf;
        const input = document.getElementById('results-page-content');
        if (!input) return;

        setIsExporting(true);
        document.body.classList.add('is-exporting');

        setTimeout(() => {
            window.html2canvas(input, { 
                scale: 2, 
                useCORS: true, 
                logging: false,
                backgroundColor: '#ffffff'
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = imgWidth / imgHeight;
                let finalImgHeight = pdfWidth / ratio;
                let heightLeft = finalImgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, finalImgHeight);
                heightLeft -= pdfHeight;

                while (heightLeft > 0) {
                    position = position - pdfHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, finalImgHeight);
                    heightLeft -= pdfHeight;
                }

                pdf.save(`GreenBiz_Report_${probingAnswers.biz_name || 'Assessment'}.pdf`);
            }).finally(() => {
                setIsExporting(false);
                document.body.classList.remove('is-exporting');
            });
        }, 800);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto pb-20"
        >
            <div id="results-page-content" className="bg-white p-8">
                <div className="hidden export-only mb-10 pb-10 border-b-2 border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                             <h1 className="text-4xl font-black text-gray-900 tracking-tight">Green Growth Report</h1>
                             <p className="text-gray-500 font-medium">Confidential Sustainability Assessment for {probingAnswers.biz_name || 'SME'}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">SME Foundation x FAO</p>
                             <p className="text-[10px] text-gray-400 mt-1">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>

                <ResultsSummaryCard totalScore={totalScore} language={language} />
                
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                    <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                        <i className="fa-solid fa-layer-group text-indigo-600"></i>
                        {language === 'en' ? 'Sector Comparison' : 'খাত তুলনা'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {SECTOR_BENCHMARKS.map(bm => (
                            <div key={bm.sector.en} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                                <span className="text-gray-600 font-medium">{bm.sector[language]}</span>
                                <span className={`font-black ${bm.score > totalScore ? 'text-gray-400' : 'text-green-600'}`}>{bm.score}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <AIRecommendations scores={scores} assessmentData={assessmentData} probingAnswers={probingAnswers} language={language} isGuest={isGuest} />
                
                {/* Detailed Breakdown for PDF */}
                <div className={`${isExporting ? 'block' : 'hidden md:block'} mt-8`}>
                   <DetailedReportTable assessmentData={assessmentData} scores={scores} language={language} />
                </div>

                <InfoSection language={language} />
            </div>

            {!isExporting && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {!isGuest ? (
                        <>
                            <button
                                onClick={handleExportPDF}
                                className="group py-4 px-6 bg-white border-2 border-red-600 text-red-600 font-black rounded-2xl shadow-sm hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3"
                            >
                                <i className="fa-solid fa-file-pdf group-hover:scale-125 transition-transform"></i>
                                {language === 'en' ? 'Download PDF Report' : 'পিডিএফ রিপোর্ট ডাউনলোড'}
                            </button>
                            <button
                                onClick={handleExportCSV}
                                className="group py-4 px-6 bg-white border-2 border-green-600 text-green-600 font-black rounded-2xl shadow-sm hover:bg-green-600 hover:text-white transition-all flex items-center justify-center gap-3"
                            >
                                <i className="fa-solid fa-file-csv group-hover:scale-125 transition-transform"></i>
                                {language === 'en' ? 'Export CSV' : 'সিএসভি এক্সপোর্ট'}
                            </button>
                        </>
                    ) : (
                        <div className="md:col-span-2 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-3 text-indigo-700 text-sm font-bold">
                            <i className="fa-solid fa-circle-info"></i>
                            {language === 'en' ? 'Log in to export detailed reports' : 'বিস্তারিত রিপোর্ট এক্সপোর্ট করতে লগ ইন করুন'}
                        </div>
                    )}
                    <button
                        onClick={onStartOver}
                        className="py-4 px-6 bg-gray-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3"
                    >
                        <i className="fa-solid fa-rotate-right"></i>
                        {language === 'en' ? 'Start New Assessment' : 'নতুন মূল্যায়ন শুরু করুন'}
                    </button>
                </div>
            )}
        </motion.div>
    );
};


const Footer: React.FC<{ language: Language }> = ({ language }) => (
  <footer className="bg-gray-900 text-white pt-20 pb-10 mt-28 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-indigo-500"></div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-20">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-green-400 text-2xl backdrop-blur-sm border border-white/10">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <h3 className="text-3xl font-black tracking-tight">GreenBiz <span className="text-green-500">Toolkit</span></h3>
          </div>
          <p className="text-gray-400 max-w-md leading-relaxed text-lg italic">
            {language === 'en' 
              ? 'Empowering the backbone of Bangladesh—our SMEs—with the tools to grow sustainably and lead the green revolution.' 
              : 'স্থায়িত্বশীলভাবে গড়ে উঠতে এবং সবুজ বিপ্লবের নেতৃত্ব দিতে বাংলাদেশের মেরুদণ্ড—আমাদের এসএমই-কে ক্ষমতায়ন করা।'}
          </p>
          <div className="flex gap-4 mt-8">
            {['linkedin', 'twitter', 'facebook', 'instagram'].map(platform => (
                <a key={platform} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-white/10 transition-all border border-white/5">
                    <i className={`fa-brands fa-${platform} text-lg`}></i>
                </a>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-green-500">{language === 'en' ? 'Quick Access' : 'দ্রুত প্রবেশ'}</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Assessment' : 'মূল্যায়ন'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Methodology' : 'পদ্ধতি'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Resources' : 'সম্পদ'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-green-500">{language === 'en' ? 'Legal' : 'আইনি'}</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Privacy Policy' : 'গোপনীয়তা নীতি'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Terms of Service' : 'ব্যবহারের শর্তাবলী'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Cookie Policy' : 'কুকি নীতি'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-green-500">{language === 'en' ? 'Support' : 'সহায়তা'}</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li className="flex items-center gap-3"><i className="fa-solid fa-envelope text-green-500/50"></i> support@greenbiz.bd</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-phone text-green-500/50"></i> +880 1234 567890</li>
              </ul>
            </div>
        </div>
      </div>
      
      <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-gray-500 font-medium tracking-tight">© {new Date().getFullYear()} Green Business Research Bangladesh. v3.1 Developed for SME Excellence.</p>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Systems Online</span>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---
export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [view, setView] = useState<'probing' | 'assessment' | 'results' | 'admin'>('probing');
  const [assessmentData, setAssessmentData] = useState<{ domain: Domain; questions: MainQuestion[] }[] | null>(null);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [probingAnswers, setProbingAnswers] = useState<ProbingAnswers>({});
  const [isGuest, setIsGuest] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('green_business_assessment_progress');
    if (savedProgress) {
        try {
            const parsed = JSON.parse(savedProgress);
            if (parsed.view) setView(parsed.view);
            if (parsed.assessmentData) setAssessmentData(parsed.assessmentData);
            if (parsed.scores) setScores(parsed.scores);
            if (parsed.probingAnswers) setProbingAnswers(parsed.probingAnswers);
            if (parsed.language) setLanguage(parsed.language);
        } catch (e) {
            console.error("Failed to load progress from localStorage", e);
        }
    }
  }, []);

  // Save progress to localStorage whenever relevant state changes
  useEffect(() => {
    const progress = {
        view,
        assessmentData,
        scores,
        probingAnswers,
        language
    };
    localStorage.setItem('green_business_assessment_progress', JSON.stringify(progress));
  }, [view, assessmentData, scores, probingAnswers, language]);

  const handleProbingComplete = useCallback((answers: ProbingAnswers) => {
    const { applicableQuestions, groupedByDomain } = generateCustomAssessmentData(answers);
    
    setScores(getInitialScores(applicableQuestions));
    setAssessmentData(groupedByDomain);
    setProbingAnswers(answers);
    setView('assessment');
  }, []);

  const handleScoreChange = useCallback((id: string, score: number) => {
    setScores(prevScores => ({ ...prevScores, [id]: score }));
  }, []);
  
  const { currentUser, userProfile, signInWithGoogle, logout } = useAuth();

  const totalScore = useMemo(() => {
    if (!assessmentData) return 0;
    
    let sumScore = 0;
    let sumMax = 0;
    
    assessmentData.forEach(group => {
        group.questions.forEach(q => {
            const score = scores[q.id];
            if (score > -1 && q.weightPriority !== 'Pathway') {
                const weight = getWeightNumber(q.weightPriority);
                sumScore += (score * weight);
                sumMax += (4 * weight);
            }
        });
    });

    return sumMax > 0 ? Math.round((sumScore / sumMax) * 100) : 0;
  }, [scores, assessmentData]);

  const handleAssessmentComplete = async () => {
    if (currentUser) {
      try {
        await addDoc(collection(db, 'assessments'), {
          enumeratorId: currentUser.uid,
          createdAt: serverTimestamp(),
          probingAnswers: probingAnswers,
          scores: scores,
          totalScore: totalScore
        });
      } catch (err) {
        console.error("Failed to save assessment to database:", err);
      }
    }
    setView('results');
  };

  const handleStartOver = useCallback(() => {
    setView('probing');
    setAssessmentData(null);
    setScores({});
    setProbingAnswers({});
    localStorage.removeItem('green_business_assessment_progress');
  }, []);

  const renderContent = () => {
    if (!currentUser && !isGuest) {
      return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-8 bg-white rounded-3xl shadow-xl mt-8 max-w-2xl mx-auto border border-green-50"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-4xl mb-6 shadow-inner">
             <i className="fa-solid fa-leaf"></i>
          </div>
          <h2 className="text-4xl font-extrabold mb-4 text-green-900 text-center tracking-tight">{language === 'en' ? 'Green Business Assessment' : 'সবুজ ব্যবসায়িক মূল্যায়ন'}</h2>
          <p className="text-gray-600 mb-10 max-w-lg text-center text-lg leading-relaxed">
            {language === 'en' 
              ? 'Evaluate your business sustainability and get AI-powered recommendations to improve your green practices.' 
              : 'আপনার ব্যবসার স্থায়িত্ব মূল্যায়ন করুন এবং আপনার সবুজ অনুশীলন উন্নত করতে এআই-চালিত সুপারিশ পান।'}
          </p>
          <div className="flex flex-col w-full gap-4 max-w-sm">
              <button onClick={signInWithGoogle} className="w-full py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 text-lg">
                <i className="fa-brands fa-google"></i>
                {language === 'en' ? 'Sign in with Google' : 'Google দিয়ে সাইন ইন করুন'}
              </button>
              <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">or</span>
                  <div className="flex-grow border-t border-gray-200"></div>
              </div>
              <button onClick={() => setIsGuest(true)} className="w-full py-4 bg-white text-gray-700 border-2 border-gray-200 font-bold rounded-xl shadow-sm hover:bg-gray-50 hover:border-green-300 transition-all flex items-center justify-center gap-3 text-lg">
                <i className="fa-solid fa-user-secret"></i>
                {language === 'en' ? 'Continue as Guest' : 'অতিথি হিসাবে চালিয়ে যান'}
              </button>
          </div>
          <p className="mt-6 text-sm text-gray-400 text-center">
             {language === 'en' ? 'Guests receive a basic score but AI recommendations require login.' : 'অতিথিরা বেসিক স্কোর পাবেন তবে এআই সুপারিশের জন্য লগইন প্রয়োজন।'}
          </p>
        </motion.div>
      );
    }

    if (userProfile?.role === 'admin' && view === 'admin') {
       return (
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
         >
           <AdminDashboard onViewAssessment={() => setView('probing')} />
         </motion.div>
       );
    }

    return (
        <AnimatePresence mode="wait">
            {(() => {
                switch (view) {
                    case 'admin':
                         return <div key="admin-placeholder" />; // Handled above
                    case 'probing':
                        return <ProbingQuestionsForm key="probing" onComplete={handleProbingComplete} language={language} isAdmin={userProfile?.role === 'admin'} />;
                    case 'assessment':
                        return assessmentData && <AssessmentScreen 
                            key="assessment"
                            assessmentData={assessmentData} 
                            scores={scores} 
                            onScoreChange={handleScoreChange} 
                            onComplete={handleAssessmentComplete} 
                            language={language}
                            isAdmin={userProfile?.role === 'admin'}
                        />;
                    case 'results':
                        return assessmentData && <ResultsPage 
                            key="results"
                            totalScore={totalScore} 
                            scores={scores} 
                            assessmentData={assessmentData} 
                            probingAnswers={probingAnswers} 
                            onStartOver={handleStartOver} 
                            language={language} 
                            isGuest={isGuest}
                        />;
                    default:
                        return <ProbingQuestionsForm key="default" onComplete={handleProbingComplete} language={language} isAdmin={userProfile?.role === 'admin'} />;
                }
            })()}
        </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-[#fcfdfc] text-gray-800 font-sans flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-3xl -z-10 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>
      
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={handleStartOver}>
                <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-green-200 transition-transform group-hover:scale-110">
                    <i className="fa-solid fa-leaf"></i>
                </div>
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-green-700">GreenBiz <span className="text-green-600 font-medium font-sans">Toolkit</span></h1>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-black opacity-80">{language === 'en' ? 'Bangladeshi SME Assessment' : 'বাংলাদেশি এসএমই মূল্যায়ন'}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                {userProfile?.role === 'admin' && (
                    <nav className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
                        <button 
                            onClick={() => setView('probing')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view !== 'admin' ? 'bg-white shadow text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <i className="fa-solid fa-clipboard-check mr-2"></i> Assessment
                        </button>
                        <button 
                            onClick={() => setView('admin')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'admin' ? 'bg-white shadow text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <i className="fa-solid fa-chart-pie mr-2"></i> Dashboard
                        </button>
                    </nav>
                )}

               <div className="flex items-center gap-4">
                  {isGuest && (
                       <button 
                            onClick={() => { setIsGuest(false); handleStartOver(); }}
                            className="px-4 py-2 bg-yellow-100 text-yellow-800 font-semibold rounded-full hover:bg-yellow-200 transition text-sm"
                       >
                           {language === 'en' ? 'Exit Guest Mode' : 'গেস্ট মোড থেকে প্রস্থান করুন'}
                       </button>
                  )}
                  {currentUser && (
                    <div className="flex items-center gap-3 bg-gray-50 pl-1 pr-3 py-1 rounded-full border border-gray-200">
                      <img 
                        src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName}&background=random`} 
                        alt="User" 
                        className="w-8 h-8 rounded-full shadow-sm ring-2 ring-white"
                      />
                      <div className="hidden sm:flex flex-col text-xs text-right">
                        <span className="font-bold text-gray-900">{currentUser.displayName}</span>
                        <span className="text-green-600 font-medium uppercase text-[10px]">{userProfile?.role}</span>
                      </div>
                      <button 
                        onClick={logout}
                        className="ml-2 p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        title="Logout"
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                    className="w-10 h-10 bg-white text-gray-700 font-bold rounded-xl shadow-sm border border-gray-200 hover:border-green-300 hover:bg-green-50 transition flex items-center justify-center text-sm"
                    title={language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
                  >
                    {language === 'en' ? 'BN' : 'EN'}
                  </button>
               </div>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4 lg:p-8 flex-grow">
        {renderContent()}
      </main>

      <Footer language={language} />
    </div>
  );
}
