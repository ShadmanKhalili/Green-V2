

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Language, Indicator, Pillar, ProbingQuestion, ProbingAnswers, LoadingTip } from './types';
import { PILLARS, SCORE_INTERPRETATIONS, SECTOR_BENCHMARKS, KEY_RESOURCES, PROBING_QUESTIONS, QUESTION_BANK, LOADING_TIPS } from './constants';
import { GoogleGenAI } from "@google/genai";

declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

// --- Helper functions ---
const getInitialScores = (indicators: Indicator[]) => {
  return indicators.reduce<{ [key: string]: number }>((acc, indicator) => {
    acc[indicator.id] = -1; // -1 represents an unanswered question
    return acc;
  }, {});
};

const generateCustomAssessmentData = (answers: ProbingAnswers) => {
    const profileTags = new Set<string>();
    const activity = answers.PQ1 as string;
    if (activity?.includes('Manufacturing')) profileTags.add('MFG');
    if (activity?.includes('Trading')) profileTags.add('TRD');
    if (activity?.includes('Retail')) {
        profileTags.add('TRD');
        profileTags.add('RETAIL');
    }
    if (activity?.includes('Service')) profileTags.add('SRV');
    if (activity?.includes('Agriculture')) profileTags.add('AGR');
    const location = answers.PQ2 as string;
    if (location?.includes('City')) profileTags.add('URB');
    if (location?.includes('Rural')) profileTags.add('RUR');
    const customers = answers.PQ3 as string;
    if (customers?.includes('Export')) profileTags.add('EXP');
    if (customers?.includes('Domestic')) profileTags.add('DOM');
    const turnover = answers.PQ4 as string;
    if (turnover === '< Tk 10 lakh' || turnover === 'Tk 10-50 lakh') profileTags.add('MICRO');
    else if (turnover === 'Tk 50 lakh - 2 crore') profileTags.add('SMALL');
    else if (turnover === 'Tk 2-5 crore' || turnover === '> Tk 5 crore') profileTags.add('MEDIUM');
    (answers.PQ5 as string[])?.forEach(resource => {
        if (resource.includes('Electricity')) profileTags.add('ELEC');
        if (resource.includes('Fuel')) profileTags.add('FUEL');
        if (resource.includes('Water')) profileTags.add('WATER');
        if (resource.includes('Chemicals')) profileTags.add('CHEM');
    });
    const awareness = (answers.PQ6 as string[]) || [];
    if (awareness.includes('None of the above')) profileTags.add('BEGINNER');
    else if (awareness.length > 2) profileTags.add('ADVANCED');
    else profileTags.add('AWARE');
    
    const calculateRelevance = (indicator: Indicator): number => {
        let score = 0;
        indicator.tags.forEach(tag => {
            if (profileTags.has(tag)) score++;
            if (tag === 'ALL') score += 0.5;
        });
        return score;
    };

    const scoredQuestions = QUESTION_BANK.map(q => ({ ...q, relevance: calculateRelevance(q) }))
                                          .sort((a, b) => b.relevance - a.relevance);
    
    const initialAssessment = PILLARS.map(pillar => {
        const pillarQuestions = scoredQuestions.filter(q => q.pillarId === pillar.id);
        const questionCount: { [key: number]: number } = { 1: 7, 2: 7, 3: 5, 4: 5, 5: 4 };
        const selectedIndicators = pillarQuestions.slice(0, questionCount[pillar.id]);
        return { ...pillar, indicators: selectedIndicators };
    });

    return { fullRankedQuestions: scoredQuestions, initialAssessment };
};

// --- UI Components ---

const LanguageSwitcher: React.FC<{ language: Language; setLanguage: (lang: Language) => void; }> = ({ language, setLanguage }) => (
  <div className="absolute top-4 right-4 z-10">
    <button
      onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
      className="px-4 py-2 bg-white border border-green-700 text-green-700 font-semibold rounded-full shadow-md hover:bg-green-50 transition-colors duration-200 flex items-center gap-2"
    >
      <i className="fa-solid fa-language"></i>
      {language === 'en' ? 'বাংলা' : 'English'}
    </button>
  </div>
);

const ProbingQuestionComponent: React.FC<{ question: ProbingQuestion; value: string | string[]; onChange: (id: string, value: any) => void; language: Language; }> = ({ question, value, onChange, language }) => (
    <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">{question.text[language]}</label>
        {question.type === 'select' && (
            <select 
                value={value as string} 
                onChange={e => onChange(question.id, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            >
                {question.options.map(opt => <option key={opt.value} value={opt.value}>{opt.text[language]}</option>)}
            </select>
        )}
        {question.type === 'checkbox' && (
            <div className="grid grid-cols-2 gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
                {question.options.map(opt => (
                    <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                            type="checkbox"
                            value={opt.value}
                            checked={(value as string[]).includes(opt.value)}
                            onChange={e => {
                                const currentValues = (value as string[]) || [];
                                const newValues = e.target.checked 
                                    ? [...currentValues, opt.value] 
                                    : currentValues.filter(v => v !== opt.value);
                                onChange(question.id, newValues);
                            }}
                            className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span>{opt.text[language]}</span>
                    </label>
                ))}
            </div>
        )}
    </div>
);

const ProbingQuestionsForm: React.FC<{ onComplete: (answers: ProbingAnswers) => void; language: Language; }> = ({ onComplete, language }) => {
    const [answers, setAnswers] = useState<ProbingAnswers>({});
    const [isComplete, setIsComplete] = useState(false);

    const handleAnswerChange = (id: string, value: any) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    useEffect(() => {
        const requiredQuestions = PROBING_QUESTIONS.filter(q => q.type === 'select').map(q => q.id);
        const allRequiredAnswered = requiredQuestions.every(id => answers[id] && answers[id] !== 'default');
        setIsComplete(allRequiredAnswered);
    }, [answers]);

    return (
        <div className="container mx-auto p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">{language === 'en' ? 'Tell us about your business' : 'আপনার ব্যবসা সম্পর্কে আমাদের বলুন'}</h2>
                <p className="text-center text-gray-600 mb-8">{language === 'en' ? 'Your answers will help us create a personalized assessment.' : 'আপনার উত্তর আমাদের একটি ব্যক্তিগত মূল্যায়ন তৈরি করতে সাহায্য করবে।'}</p>
                {PROBING_QUESTIONS.map(q => (
                    <ProbingQuestionComponent key={q.id} question={q} value={answers[q.id] || (q.type === 'checkbox' ? [] : '')} onChange={handleAnswerChange} language={language} />
                ))}
                <button 
                    onClick={() => onComplete(answers)}
                    disabled={!isComplete}
                    className="w-full mt-4 py-3 px-6 bg-green-700 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                >
                    {language === 'en' ? 'Generate My Assessment' : 'আমার মূল্যায়ন তৈরি করুন'}
                </button>
            </div>
        </div>
    );
};

const IndicatorRow: React.FC<{ 
    indicator: Indicator; 
    currentScore: number; 
    onScoreChange: (id: string, score: number) => void; 
    language: Language; 
    onReplace: (pillarId: number, questionId: string) => void;
    canReplace: boolean;
}> = ({ indicator, currentScore, onScoreChange, language, onReplace, canReplace }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center py-4 border-b border-gray-200 last:border-b-0">
      <div className="md:col-span-1"><p className="font-semibold text-gray-700">{indicator.text[language]}</p></div>
      <div className="md:col-span-2 flex items-center gap-2">
        <select value={currentScore} onChange={(e) => onScoreChange(indicator.id, parseInt(e.target.value, 10))} className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
          <option value="-1" disabled>{language === 'en' ? 'Select an option...' : 'একটি বিকল্প নির্বাচন করুন...'}</option>
          {indicator.scoringGuide.map(option => (
            <option key={option.score} value={option.score}>{option.score} - {option.description[language]}</option>
          ))}
        </select>
        <div className="w-20 text-center">
             <span className="font-bold text-lg text-green-700">{currentScore > -1 ? currentScore : '-'}</span>
             <span className="text-gray-500"> / {indicator.maxScore}</span>
        </div>
        <button 
            onClick={() => onReplace(indicator.pillarId, indicator.id)} 
            disabled={!canReplace}
            title={language === 'en' ? 'Replace Question' : 'প্রশ্ন প্রতিস্থাপন করুন'}
            className="p-2 text-gray-500 hover:text-green-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        >
            <i className="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </div>
);

const PillarCard: React.FC<{ 
    pillar: Pillar; 
    scores: { [key: string]: number }; 
    onScoreChange: (id: string, score: number) => void; 
    language: Language;
    onReplaceQuestion: (pillarId: number, questionId: string) => void;
    replacementsLeft: number;
    canPillarBeReplaced: boolean;
}> = ({ pillar, scores, onScoreChange, language, onReplaceQuestion, replacementsLeft, canPillarBeReplaced }) => {
  // FIX: Add a type guard to ensure the score is a number before comparison. This prevents runtime errors with unexpected types.
  const pillarScore = pillar.indicators.reduce((acc, ind) => {
    const score = scores[ind.id];
    return acc + (typeof score === 'number' && score > -1 ? score : 0);
  }, 0);
  const maxPillarScore = pillar.indicators.reduce((acc, ind) => acc + ind.maxScore, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-shadow hover:shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-green-800">{pillar.id}. {pillar.title[language]}</h2>
          <p className="text-gray-500">{language === 'en' ? 'Weight' : 'গুরুত্ব'}: {pillar.points} {language === 'en' ? 'Points' : 'পয়েন্ট'}</p>
        </div>
        <div className="text-right">
            <p className="text-3xl font-bold text-green-700">{pillarScore}</p>
            <p className="text-gray-500">/ {maxPillarScore}</p>
        </div>
      </div>
      <div>
        {pillar.indicators.map(indicator => (
          <IndicatorRow 
            key={indicator.id} 
            indicator={indicator} 
            currentScore={scores[indicator.id]} 
            onScoreChange={onScoreChange} 
            language={language}
            onReplace={onReplaceQuestion}
            canReplace={replacementsLeft > 0 && canPillarBeReplaced}
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

const AIRecommendations: React.FC<{ scores: { [key: string]: number }; assessmentData: Pillar[]; probingAnswers: ProbingAnswers; language: Language; }> = ({ scores, assessmentData, probingAnswers, language }) => {
    const [recommendations, setRecommendations] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    useEffect(() => {
        if (loading) {
            const timer = setInterval(() => {
                setCurrentTipIndex(prevIndex => (prevIndex + 1) % LOADING_TIPS.length);
            }, 3000); // Change tip every 3 seconds
            return () => clearInterval(timer);
        }
    }, [loading]);

    const generateRecommendations = async () => {
        setLoading(true);
        setError('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

            const lowScoringAnswers = assessmentData
                .flatMap(p => p.indicators)
                // FIX: Add a type guard to ensure the score is a number before comparison. This prevents runtime errors with unexpected types.
                .filter(indicator => {
                    const score = scores[indicator.id];
                    return typeof score === 'number' && score >= 0 && score <= 2;
                })
                .map(indicator => {
                    const answer = indicator.scoringGuide.find(sg => sg.score === scores[indicator.id]);
                    return `- Question: ${indicator.text.en}\n  - Answer (Score ${scores[indicator.id]}): ${answer?.description.en}`;
                })
                .join('\n');
            
            const businessProfile = Object.entries(probingAnswers)
                .map(([key, value]) => {
                    const question = PROBING_QUESTIONS.find(q => q.id === key);
                    return `- ${question?.text.en}: ${Array.isArray(value) ? value.join(', ') : value}`;
                })
                .join('\n');

            const prompt = `You are an expert consultant for small and medium-sized enterprises (SMEs) in Bangladesh, specializing in green and sustainable business practices.

A business has just completed a sustainability assessment. Based on their profile and low-scoring answers below, provide a set of 3-5 actionable, prioritized recommendations in ${language === 'bn' ? 'Bengali' : 'English'}. For each recommendation, explain why it's important and suggest the first practical step they can take. Focus on low-cost, high-impact suggestions. Format the response as Markdown.

Business Profile:
${businessProfile}

Assessment Results (Areas for Improvement):
${lowScoringAnswers}

Now, provide your expert recommendations.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setRecommendations(response.text);
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
                 <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
                    <p className="mt-4 text-gray-600 font-semibold">{language === 'en' ? 'Generating personalized advice...' : 'ব্যক্তিগত পরামর্শ তৈরি করা হচ্ছে...'}</p>
                    <p className="mt-4 text-sm text-gray-500 h-10 transition-opacity duration-500">{LOADING_TIPS[currentTipIndex][language]}</p>
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <div className="prose prose-green max-w-none" dangerouslySetInnerHTML={{ __html: recommendations.replace(/\n/g, '<br />') }}></div>
            )}
        </div>
    );
};

const AssessmentProgress: React.FC<{ 
    scores: { [key: string]: number }; 
    assessmentData: Pillar[]; 
    language: Language; 
    replacementsLeft: number;
}> = ({ scores, assessmentData, language, replacementsLeft }) => {
    const totalQuestions = useMemo(() => assessmentData.flatMap(p => p.indicators).length, [assessmentData]);
    const answeredQuestions = useMemo(() => Object.values(scores).filter(score => score > -1).length, [scores]);
    const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

    return (
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm shadow-md p-4 mb-8 rounded-lg">
            <div className="flex justify-between items-center mb-2 text-sm md:text-base">
                <h3 className="font-bold text-green-800">{language === 'en' ? 'Progress' : 'অগ্রগতি'}</h3>
                <span className="font-semibold text-gray-700">{answeredQuestions} / {totalQuestions} {language === 'en' ? 'Answered' : 'উত্তর'}</span>
                <span className="font-semibold text-gray-700">{language === 'en' ? 'Replacements Left:' : 'প্রতিস্থাপন বাকি:'} {replacementsLeft}</span>
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
    assessmentData: Pillar[];
    scores: { [key: string]: number };
    onScoreChange: (id: string, score: number) => void;
    onComplete: () => void;
    language: Language;
    replacementsLeft: number;
    onReplaceQuestion: (pillarId: number, questionId: string) => void;
    fullRankedQuestions: Indicator[];
}> = ({ assessmentData, scores, onScoreChange, onComplete, language, replacementsLeft, onReplaceQuestion, fullRankedQuestions }) => {
    return (
        <>
            <AssessmentProgress scores={scores} assessmentData={assessmentData} language={language} replacementsLeft={replacementsLeft} />
            {assessmentData.map(pillar => {
                const totalRelevantQuestionsForPillar = fullRankedQuestions.filter(q => q.pillarId === pillar.id).length;
                const canPillarBeReplaced = totalRelevantQuestionsForPillar > pillar.indicators.length;
                return (
                    <PillarCard 
                        key={pillar.id} 
                        pillar={pillar} 
                        scores={scores} 
                        onScoreChange={onScoreChange} 
                        language={language}
                        onReplaceQuestion={onReplaceQuestion}
                        replacementsLeft={replacementsLeft}
                        canPillarBeReplaced={canPillarBeReplaced}
                    />
                )
            })}
            <button
                onClick={onComplete}
                className="w-full mt-4 py-3 px-6 bg-green-700 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-800 transition-colors duration-300"
            >
                {language === 'en' ? 'Finish & See Results' : 'শেষ করুন এবং ফলাফল দেখুন'}
            </button>
        </>
    );
};

interface PillarScoreData {
    title: string;
    score: number;
    maxScore: number;
    weight: number;
    weightedScore: number;
}

const pillarColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-indigo-500',
];

const PillarScoresChart: React.FC<{ pillarScores: PillarScoreData[]; language: Language; }> = ({ pillarScores, language }) => {
    const [animatedScores, setAnimatedScores] = useState<number[]>([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedScores(pillarScores.map(p => p.weight > 0 ? (p.weightedScore / p.weight) * 100 : 0));
        }, 100);
        return () => clearTimeout(timeout);
    }, [pillarScores]);

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 my-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {language === 'en' ? 'Performance by Pillar' : 'স্তম্ভ অনুযায়ী কর্মক্ষমতা'}
            </h3>
            <div className="space-y-4">
                {pillarScores.map((pillar, index) => (
                    <div key={pillar.title}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-gray-700">{pillar.title}</span>
                            <span className="font-bold text-gray-800">{pillar.weightedScore} / {pillar.weight}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                            <div
                                className={`${pillarColors[index % pillarColors.length]} h-6 rounded-full text-white flex items-center justify-center text-sm font-bold transition-all duration-1000 ease-out`}
                                style={{ width: `${animatedScores[index] || 0}%` }}
                            >
                                {Math.round(animatedScores[index] || 0)}%
                            </div>
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
    assessmentData: Pillar[];
    probingAnswers: ProbingAnswers;
    onStartOver: () => void;
    language: Language;
}> = ({ totalScore, scores, assessmentData, probingAnswers, onStartOver, language }) => {
    const [isExporting, setIsExporting] = useState(false);
    
    const interpretation = useMemo(() => SCORE_INTERPRETATIONS.find(interp => totalScore >= interp.minScore)!, [totalScore]);

    const pillarScores = useMemo(() => {
        return assessmentData.map(pillar => {
            // FIX: Add a type guard to ensure the score is a number before comparison. This resolves a TypeScript error.
            const pillarScore = pillar.indicators.reduce((acc, ind) => {
                const score = scores[ind.id];
                return acc + (typeof score === 'number' && score > -1 ? score : 0);
            }, 0);
            const maxPillarScore = pillar.indicators.reduce((acc, ind) => acc + ind.maxScore, 0);
            const weightedScore = maxPillarScore > 0 ? (pillarScore / maxPillarScore) * pillar.points : 0;
            return {
                title: pillar.title[language],
                score: pillarScore,
                maxScore: maxPillarScore,
                weight: pillar.points,
                weightedScore: Math.round(weightedScore),
            };
        });
    }, [assessmentData, scores, language]);

    const handleExportCSV = () => {
        const headers = [
            language === 'en' ? 'Category' : 'বিভাগ',
            language === 'en' ? 'Pillar' : 'স্তম্ভ',
            language === 'en' ? 'Score' : 'স্কোর',
            language === 'en' ? 'Max Score' : 'সর্বোচ্চ স্কোর',
            language === 'en' ? 'Weighted Score' : 'ভারিত স্কোর',
            language === 'en' ? 'Pillar Weight' : 'স্তম্ভের গুরুত্ব',
        ];
    
        let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
    
        pillarScores.forEach(p => {
            csvContent += `Pillar Score,"${p.title}",${p.score},${p.maxScore},${p.weightedScore},${p.weight}\n`;
        });
    
        csvContent += "\n";
        csvContent += `Final Result,"Total Score",${totalScore},100,${totalScore},100\n`;
        csvContent += `Final Result,"Rating","${interpretation.rating.level[language]}","","",""\n`;
    
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
                <PillarScoresChart pillarScores={pillarScores} language={language} />
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
  const [assessmentData, setAssessmentData] = useState<Pillar[] | null>(null);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [probingAnswers, setProbingAnswers] = useState<ProbingAnswers>({});
  const [replacementsLeft, setReplacementsLeft] = useState(5);
  const [fullRankedQuestions, setFullRankedQuestions] = useState<Indicator[]>([]);

  const handleProbingComplete = useCallback((answers: ProbingAnswers) => {
    const { fullRankedQuestions: ranked, initialAssessment } = generateCustomAssessmentData(answers);
    const allIndicators = initialAssessment.flatMap(p => p.indicators);
    
    setFullRankedQuestions(ranked);
    setScores(getInitialScores(allIndicators));
    setAssessmentData(initialAssessment);
    setProbingAnswers(answers);
    setView('assessment');
    setReplacementsLeft(5);
  }, []);

  const handleScoreChange = useCallback((indicatorId: string, score: number) => {
    setScores(prevScores => ({ ...prevScores, [indicatorId]: score }));
  }, []);
  
  const handleReplaceQuestion = useCallback((pillarId: number, questionIdToReplace: string) => {
    if (replacementsLeft <= 0) return;

    const pillarRankedQuestions = fullRankedQuestions.filter(q => q.pillarId === pillarId);
    const currentPillar = assessmentData?.find(p => p.id === pillarId);
    if (!currentPillar) return;

    const currentIndicatorIds = new Set(currentPillar.indicators.map(i => i.id));
    
    const newQuestion = pillarRankedQuestions.find(q => !currentIndicatorIds.has(q.id));

    if (newQuestion) {
        setAssessmentData(prevData => {
            if (!prevData) return null;
            return prevData.map(p => {
                if (p.id === pillarId) {
                    return {
                        ...p,
                        indicators: p.indicators.map(ind => ind.id === questionIdToReplace ? newQuestion : ind)
                    };
                }
                return p;
            });
        });

        setScores(prevScores => {
            const newScores = { ...prevScores };
            delete newScores[questionIdToReplace];
            newScores[newQuestion.id] = -1;
            return newScores;
        });
        
        setReplacementsLeft(prev => prev - 1);
    } else {
        alert(language === 'en' ? 'No more relevant questions available for this section.' : 'এই বিভাগের জন্য আর কোনো প্রাসঙ্গিক প্রশ্ন উপলব্ধ নেই।');
    }
}, [replacementsLeft, fullRankedQuestions, assessmentData, language]);


  const handleAssessmentComplete = useCallback(() => {
    setView('results');
  }, []);

  const handleStartOver = useCallback(() => {
    setView('probing');
    setAssessmentData(null);
    setScores({});
    setProbingAnswers({});
    setReplacementsLeft(5);
    setFullRankedQuestions([]);
  }, []);

  const totalScore = useMemo(() => {
    if (!assessmentData) return 0;
    const finalScore = assessmentData.reduce((total, pillar) => {
        const pillarScore = pillar.indicators.reduce((acc, ind) => {
            const score = scores[ind.id];
            return acc + (typeof score === 'number' && score > -1 ? score : 0);
        }, 0);
        const maxPillarScore = pillar.indicators.reduce((acc, ind) => acc + ind.maxScore, 0);
        if (maxPillarScore === 0) return total;
        const normalizedPillarScore = (pillarScore / maxPillarScore) * pillar.points;
        return total + normalizedPillarScore;
    }, 0);
    return Math.round(finalScore);
  }, [scores, assessmentData]);

  const renderContent = () => {
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
                replacementsLeft={replacementsLeft}
                onReplaceQuestion={handleReplaceQuestion}
                fullRankedQuestions={fullRankedQuestions}
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
        <div className="container mx-auto text-center">
            <h1 className="text-4xl font-extrabold">{language === 'en' ? 'Green Business Assessment Tool' : 'সবুজ ব্যবসায়িক মূল্যায়ন সরঞ্জাম'}</h1>
            <p className="text-lg mt-2 opacity-90">{language === 'en' ? 'For Bangladeshi SMEs' : 'বাংলাদেশের ছোট ও মাঝারি শিল্পের জন্য'}</p>
        </div>
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
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