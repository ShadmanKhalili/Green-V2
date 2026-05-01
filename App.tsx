

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Language, Indicator, Pillar, ProbingQuestion, ProbingAnswers } from './types';
import { MAIN_QUESTIONS, DOMAINS } from './questionBank';
import { SCORING_OPTIONS, PROBING_QUESTIONS, SCORE_INTERPRETATIONS, SECTOR_BENCHMARKS, KEY_RESOURCES } from './constants';
import { GoogleGenAI } from "@google/genai";
import { useAuth } from './AuthContext';
import { AdminDashboard } from './src/AdminDashboard';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

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
    const applicableQuestions = MAIN_QUESTIONS.filter(q => q.routingCondition(answers));
    
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

const ProbingQuestionsForm: React.FC<{ onComplete: (answers: ProbingAnswers) => void; language: Language; }> = ({ onComplete, language }) => {
    const [answers, setAnswers] = useState<ProbingAnswers>({});

    const handleAnswerChange = (id: string, value: any) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
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
        <div className="container mx-auto p-4 sm:p-8 hover-effects-enabled">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                    <div 
                        className="h-full bg-green-500 transition-all duration-500 ease-out"
                        style={{ width: `${requiredQuestions.length > 0 ? (answeredCount / requiredQuestions.length) * 100 : 0}%` }}
                    ></div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-3 tracking-tight mt-2">{language === 'en' ? 'Tell us about your business' : 'আপনার ব্যবসা সম্পর্কে আমাদের বলুন'}</h2>
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
        </div>
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
  const interpretation = useMemo(() => SCORE_INTERPRETATIONS.find(interp => totalScore >= interp.minScore)!, [totalScore]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 my-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{language === 'en' ? 'Your Assessment Result' : 'আপনার মূল্যায়ন ফলাফল'}</h2>
      <div className="flex flex-col items-center">
        <ScoreGauge score={totalScore} />
        <div className={`mt-4 px-4 py-2 rounded-full font-semibold text-white ${interpretation.colorClass}`}>{interpretation.rating.level[language]}</div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-gray-600">{interpretation.rating.meaning[language]}</p>
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h4 className="font-bold text-gray-800">{language === 'en' ? 'Recommended Actions' : 'প্রস্তাবিত পদক্ষেপ'}</h4>
            <p className="text-green-700">{interpretation.rating.actions[language]}</p>
        </div>
      </div>
      <div className="mt-8">
        <h4 className="text-lg font-bold text-gray-800 mb-2">{language === 'en' ? 'Sector Benchmarks' : 'খাত বেঞ্চমার্ক'}</h4>
        <div className="space-y-2">
            {SECTOR_BENCHMARKS.map(bm => (<div key={bm.sector.en} className="flex justify-between items-center text-sm"><span className="text-gray-600">{bm.sector[language]}:</span><span className="font-semibold text-gray-800">{bm.score}/100</span></div>))}
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

const AIRecommendations: React.FC<{ scores: { [key: string]: number }; assessmentData: { domain: Domain; questions: MainQuestion[] }[]; probingAnswers: ProbingAnswers; language: Language; }> = ({ scores, assessmentData, probingAnswers, language }) => {
    const [recommendations, setRecommendations] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const generateRecommendations = async () => {
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

For each recommendation, explain why it's important and suggest the first practical step they can take. Focus on low-cost, high-impact suggestions. Format the response as Markdown.

Business Profile:
${businessProfile}

Assessment Results (Areas for Improvement):
${lowScoringAnswers}

Now, provide your expert recommendations tailored to the specific business profile.`;

            const response = await ai.models.generateContent({
                model: 'gemini-3.1-pro-preview',
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
    }, [assessmentData, scores, probingAnswers, language]);

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 my-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">{language === 'en' ? 'AI-Generated Recommendations' : 'AI-জেনারেটেড সুপারিশ'}</h2>
            {loading && (
                 <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
                    <p className="ml-4 text-gray-600">{language === 'en' ? 'Generating personalized advice...' : 'ব্যক্তিগত পরামর্শ তৈরি করা হচ্ছে...'}</p>
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <div className="prose prose-green max-w-none" dangerouslySetInnerHTML={{ __html: (recommendations || '').replace(/\n/g, '<br />') }}></div>
            )}
        </div>
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
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm shadow-md p-4 mb-8 rounded-lg">
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
}> = ({ assessmentData, scores, onScoreChange, onComplete, language }) => {
    
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

    return (
        <>
            <AssessmentProgress scores={scores} assessmentData={assessmentData} language={language} />
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
        </>
    );
};

const ResultsPage: React.FC<{
    totalScore: number;
    scores: { [key: string]: number };
    assessmentData: { domain: Domain; questions: MainQuestion[] }[];
    probingAnswers: ProbingAnswers;
    onStartOver: () => void;
    language: Language;
}> = ({ totalScore, scores, assessmentData, probingAnswers, onStartOver, language }) => {
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
        const headers = [
            language === 'en' ? 'Domain' : 'বিভাগ',
            language === 'en' ? 'Score' : 'স্কোর',
            language === 'en' ? 'Max Score' : 'সর্বোচ্চ স্কোর',
            language === 'en' ? 'Percentage' : 'শতাংশ',
        ];
    
        let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
    
        domainScores.forEach(d => {
            csvContent += `"${d.title}",${d.score},${d.maxScore},${d.percent}%\n`;
        });
    
        csvContent += "\n";
        csvContent += `Final Result,"Total Score",${totalScore}%,100%\n`;
        csvContent += `Final Result,"Rating","${interpretation.rating.level[language]}",""\n`;
    
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "green_business_assessment.csv");
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

        setTimeout(() => {
            // FIX: Use window.html2canvas as it's defined on the window object.
            window.html2canvas(input, { scale: 2, useCORS: true, logging: false }).then(canvas => {
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

                pdf.save('green-business-assessment.pdf');
            }).finally(() => {
                setIsExporting(false);
            });
        }, 200);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div id="results-page-content">
                <ResultsSummaryCard totalScore={totalScore} language={language} />
                <AIRecommendations scores={scores} assessmentData={assessmentData} probingAnswers={probingAnswers} language={language} />
                <InfoSection language={language} />
            </div>

            {!isExporting && (
                <div className="mt-8 space-y-4">
                     <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={handleExportPDF}
                            className="w-full py-3 px-6 bg-red-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-file-pdf"></i>
                            {language === 'en' ? 'Export PDF' : 'পিডিএফ এক্সপোর্ট'}
                        </button>
                        <button
                            onClick={handleExportCSV}
                            className="w-full py-3 px-6 bg-green-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-file-csv"></i>
                            {language === 'en' ? 'Export CSV' : 'সিএসভি এক্সপোর্ট'}
                        </button>
                    </div>
                    <button
                        onClick={onStartOver}
                        className="w-full py-3 px-6 bg-gray-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-rotate-right"></i>
                        {language === 'en' ? 'Start Over' : 'আবার শুরু করুন'}
                    </button>
                </div>
            )}
        </div>
    );
};


// --- Main App Component ---
export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [view, setView] = useState<'probing' | 'assessment' | 'results'>('probing');
  const [assessmentData, setAssessmentData] = useState<{ domain: Domain; questions: MainQuestion[] }[] | null>(null);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [probingAnswers, setProbingAnswers] = useState<ProbingAnswers>({});

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
    if (!currentUser) {
      return (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-lg mt-8">
          <h2 className="text-3xl font-bold mb-4 text-green-800">{language === 'en' ? 'Welcome to Green Business Assessment Tool' : 'সবুজ ব্যবসায়িক মূল্যায়ন সরঞ্জামে স্বাগতম'}</h2>
          <p className="text-gray-600 mb-8 max-w-lg text-center text-lg">
            {language === 'en' 
              ? 'Please sign in to start entering assessment data.' 
              : 'মূল্যায়ন ডেটা প্রবেশ করতে অনুগ্রহ করে সাইন ইন করুন।'}
          </p>
          <button onClick={signInWithGoogle} className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition flex items-center justify-center gap-3">
            <i className="fa-brands fa-google text-xl"></i>
            {language === 'en' ? 'Sign in with Google' : 'Google দিয়ে সাইন ইন করুন'}
          </button>
        </div>
      );
    }

    if (userProfile?.role === 'admin' && view === 'probing' && Object.keys(probingAnswers).length === 0) {
       return (
         <div className="space-y-12">
           <AdminDashboard />
           <div className="border-t-4 border-green-200 pt-8 text-center max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">{language === 'en' ? 'Or Start New Assessment' : 'অথবা নতুন মূল্যায়ন শুরু করুন'}</h3>
           </div>
           <ProbingQuestionsForm onComplete={handleProbingComplete} language={language} />
         </div>
       );
    }

    switch (view) {
        case 'probing':
            return <ProbingQuestionsForm onComplete={handleProbingComplete} language={language} />;
        case 'assessment':
            return assessmentData && <AssessmentScreen 
                assessmentData={assessmentData} 
                scores={scores} 
                onScoreChange={handleScoreChange} 
                onComplete={handleAssessmentComplete} 
                language={language}
            />;
        case 'results':
            return assessmentData && <ResultsPage 
                totalScore={totalScore} 
                scores={scores} 
                assessmentData={assessmentData} 
                probingAnswers={probingAnswers} 
                onStartOver={handleStartOver} 
                language={language} 
            />;
        default:
            return <ProbingQuestionsForm onComplete={handleProbingComplete} language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-green-700 text-white p-6 shadow-md relative">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold">{language === 'en' ? 'Green Business Assessment Tool' : 'সবুজ ব্যবসায়িক মূল্যায়ন সরঞ্জাম'}</h1>
                <p className="text-lg mt-2 opacity-90">{language === 'en' ? 'For Bangladeshi SMEs' : 'বাংলাদেশের ছোট ও মাঝারি শিল্পের জন্য'}</p>
            </div>
            
            <div className="flex items-center gap-4">
               {currentUser && (
                  <div className="flex items-center gap-4 bg-green-800/50 px-4 py-2 rounded-full border border-green-600">
                    <div className="flex flex-col text-sm text-right">
                       <span className="font-bold">{currentUser.displayName || currentUser.email}</span>
                       <span className="text-green-200 capitalize">{userProfile?.role || 'User'}</span>
                    </div>
                    <button 
                       onClick={logout}
                       className="p-2 text-red-300 hover:text-red-100 transition-colors"
                       title="Logout"
                    >
                       <i className="fa-solid fa-right-from-bracket text-xl"></i>
                    </button>
                  </div>
               )}
               <div className="static md:relative">
                 <button
                   onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                   className="px-4 py-2 bg-white text-green-700 font-semibold rounded-full shadow hover:bg-green-50 transition flex items-center gap-2"
                 >
                   <i className="fa-solid fa-language"></i>
                   {language === 'en' ? 'বাংলা' : 'English'}
                 </button>
               </div>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4 lg:p-8">
        {renderContent()}
      </main>
      
      <footer className="bg-green-800 text-white text-center p-4 mt-8">
          <p>&copy; 2024 Sustainable Business Research Bangladesh. Version 3.1</p>
      </footer>
    </div>
  );
}