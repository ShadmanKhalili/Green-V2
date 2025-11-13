





import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Language, Indicator, Pillar, ProbingQuestion, ProbingAnswers, LoadingTip } from './types';
import { PILLARS, SCORE_INTERPRETATIONS, SECTOR_BENCHMARKS, KEY_RESOURCES, PROBING_QUESTIONS, QUESTION_BANK, LOADING_TIPS } from './constants';

declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

const PILLAR_ICONS: { [key: number]: string } = {
  1: 'fa-solid fa-leaf', // Energy & Resource Efficiency
  2: 'fa-solid fa-shield-halved', // Environmental Management
  3: 'fa-solid fa-hand-holding-dollar', // Green Finance
  4: 'fa-solid fa-users', // Social Sustainability
  5: 'fa-solid fa-lightbulb' // Digital & Innovation
};


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
  <div className="absolute top-1/2 -translate-y-1/2 right-6 z-10">
    <button
      onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
      className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
    >
      <i className="fa-solid fa-language text-xl"></i>
      <span className="hidden md:inline">{language === 'en' ? 'বাংলা' : 'English'}</span>
    </button>
  </div>
);

const ProbingQuestionComponent: React.FC<{ question: ProbingQuestion; value: string | string[]; onChange: (id: string, value: any) => void; language: Language; }> = ({ question, value, onChange, language }) => (
    <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <label className="block text-lg font-semibold text-brand-gray-700 mb-2">{question.text[language]}</label>
        {question.type === 'select' && (
            <select 
                value={value as string} 
                onChange={e => onChange(question.id, e.target.value)}
                className="w-full p-3 border border-brand-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-green transition-all"
            >
                {question.options.map(opt => <option key={opt.value} value={opt.value}>{opt.text[language]}</option>)}
            </select>
        )}
        {question.type === 'checkbox' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 border border-brand-gray-200 rounded-lg bg-brand-gray-50">
                {question.options.map(opt => (
                    <label key={opt.value} className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-green-100 transition-colors">
                        <input 
                            type="checkbox"
                            value={opt.value}
                            checked={Array.isArray(value) && value.includes(opt.value)}
                            onChange={e => {
                                const currentValues = Array.isArray(value) ? value : [];
                                const newValues = e.target.checked 
                                    ? [...currentValues, opt.value] 
                                    : currentValues.filter(v => v !== opt.value);
                                onChange(question.id, newValues);
                            }}
                            className="h-5 w-5 rounded border-gray-300 text-brand-green focus:ring-brand-green custom-checkbox"
                        />
                        <span className="text-brand-gray-700">{opt.text[language]}</span>
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
        <div className="container mx-auto p-4 md:p-8 animate-fade-in-up">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8 transform hover:-translate-y-1 transition-transform duration-300">
                <h2 className="text-4xl font-extrabold text-center text-brand-gray-800 mb-2">{language === 'en' ? 'Tell Us About Your Business' : 'আপনার ব্যবসা সম্পর্কে বলুন'}</h2>
                <p className="text-center text-brand-gray-700 mb-8">{language === 'en' ? 'Your answers will help us create a personalized assessment.' : 'আপনার উত্তর আমাদের একটি ব্যক্তিগত মূল্যায়ন তৈরি করতে সাহায্য করবে।'}</p>
                {PROBING_QUESTIONS.map(q => (
                    <ProbingQuestionComponent key={q.id} question={q} value={answers[q.id] || (q.type === 'checkbox' ? [] : '')} onChange={handleAnswerChange} language={language} />
                ))}
                <button 
                    onClick={() => onComplete(answers)}
                    disabled={!isComplete}
                    className="w-full mt-4 py-4 px-6 bg-brand-green text-white font-bold text-lg rounded-lg shadow-lg hover:bg-brand-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    {language === 'en' ? 'Generate My Assessment' : 'আমার মূল্যায়ন তৈরি করুন'}
                </button>
            </div>
        </div>
    );
};

const Tooltip: React.FC<{ text: React.ReactNode; children: React.ReactNode; }> = ({ text, children }) => {
    return (
        <div className="tooltip-container">
            {children}
            <div className="tooltip-text">{text}</div>
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
}> = ({ indicator, currentScore, onScoreChange, language, onReplace, canReplace }) => {
    const tooltipContent = (
        <div className="text-sm">
            <p className="font-bold mb-2">{language === 'en' ? 'Scoring Guide:' : 'স্কোরিং নির্দেশিকা:'}</p>
            <ul className="space-y-1">
                {indicator.scoringGuide.map(option => (
                    <li key={option.score}>
                        <span className="font-semibold">{option.score} Pts:</span> {option.description[language]}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b border-gray-200 last:border-b-0">
            <div className="md:col-span-5 flex items-center gap-2">
                <p className="font-medium text-brand-gray-700">{indicator.text[language]}</p>
                <Tooltip text={tooltipContent}>
                    <i className="fa-solid fa-circle-info text-gray-400 hover:text-brand-teal cursor-pointer"></i>
                </Tooltip>
            </div>
            <div className="md:col-span-7 flex items-center gap-2">
                <select value={currentScore} onChange={(e) => onScoreChange(indicator.id, parseInt(e.target.value, 10))} className="flex-grow p-2 border border-brand-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green transition-all">
                    <option value="-1" disabled>{language === 'en' ? 'Select an option...' : 'একটি বিকল্প নির্বাচন করুন...'}</option>
                    {indicator.scoringGuide.map(option => (
                        <option key={option.score} value={option.score}>{option.score} - {option.description[language]}</option>
                    ))}
                </select>
                <div className="w-20 text-center">
                    <span className="font-bold text-xl text-brand-green">{currentScore > -1 ? currentScore : '-'}</span>
                    <span className="text-gray-500"> / {indicator.maxScore}</span>
                </div>
                <button 
                    onClick={() => onReplace(indicator.pillarId, indicator.id)} 
                    disabled={!canReplace}
                    title={language === 'en' ? 'Replace Question' : 'প্রশ্ন প্রতিস্থাপন করুন'}
                    className="p-2 text-gray-500 hover:text-brand-green disabled:text-gray-300 disabled:cursor-not-allowed transition-colors transform hover:rotate-45 duration-300"
                >
                    <i className="fa-solid fa-arrows-rotate fa-lg"></i>
                </button>
            </div>
        </div>
    );
};

const PillarCard: React.FC<{ 
    pillar: Pillar; 
    scores: { [key: string]: number }; 
    onScoreChange: (id: string, score: number) => void; 
    language: Language;
    onReplaceQuestion: (pillarId: number, questionId: string) => void;
    replacementsLeft: number;
    canPillarBeReplaced: boolean;
}> = ({ pillar, scores, onScoreChange, language, onReplaceQuestion, replacementsLeft, canPillarBeReplaced }) => {
  const pillarScore = pillar.indicators.reduce((acc, ind) => {
    const score = scores[ind.id] ?? -1;
    return acc + (score > -1 ? score : 0);
  }, 0);
  const maxPillarScore = pillar.indicators.reduce((acc, ind) => acc + ind.maxScore, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fade-in-up">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <i className={`${PILLAR_ICONS[pillar.id]} text-3xl text-brand-green`}></i>
          <div>
            <h2 className="text-2xl font-bold text-brand-green-dark">{pillar.id}. {pillar.title[language]}</h2>
            <p className="text-gray-500">{language === 'en' ? 'Weight' : 'গুরুত্ব'}: {pillar.points} {language === 'en' ? 'Points' : 'পয়েন্ট'}</p>
          </div>
        </div>
        <div className="text-right">
            <p className="text-4xl font-extrabold text-brand-green">{pillarScore}</p>
            <p className="text-gray-500">/ {maxPillarScore}</p>
        </div>
      </div>
      <div className="mt-4">
        {pillar.indicators.map(indicator => (
          <IndicatorRow 
            key={indicator.id} 
            indicator={indicator} 
            currentScore={scores[indicator.id] ?? -1} 
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

const AnimatedNumber = ({ value }: { value: number }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let start = 0;
                const end = value;
                if (start === end) return;
                const duration = 1500;
                const incrementTime = (duration / end);
                const timer = setInterval(() => {
                    start += 1;
                    setDisplayValue(start);
                    if (start === end) {
                        clearInterval(timer);
                    }
                }, incrementTime);
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        if(ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value]);

    return <span ref={ref}>{displayValue}</span>;
};

const ScoreGauge: React.FC<{ score: number; }> = ({ score }) => {
    const interpretation = SCORE_INTERPRETATIONS.find(interp => score >= interp.minScore)!;
    const circumference = 2 * Math.PI * 52;
    const [offset, setOffset] = useState(circumference);
    
    useEffect(() => {
        // Animate stroke on load
        const progress = score / 100;
        const finalOffset = circumference - progress * circumference;
        setTimeout(() => setOffset(finalOffset), 100);
    }, [score, circumference]);

    return (
        <div className="relative flex items-center justify-center w-48 h-48">
            <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" strokeWidth="16" className="text-gray-200" fill="transparent" />
                <circle cx="60" cy="60" r="52" strokeWidth="16" fill="transparent" className={`${interpretation.textColor}`}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                />
            </svg>
            <div className="absolute text-5xl font-bold text-brand-gray-700">
                <AnimatedNumber value={score} />
            </div>
        </div>
    );
};

const ResultsSummaryCard: React.FC<{ totalScore: number; language: Language; }> = ({ totalScore, language }) => {
  const interpretation = useMemo(() => SCORE_INTERPRETATIONS.find(interp => totalScore >= interp.minScore)!, [totalScore]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 my-8 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-center text-brand-gray-800 mb-6">{language === 'en' ? 'Your Assessment Result' : 'আপনার মূল্যায়ন ফলাফল'}</h2>
      <div className="flex flex-col items-center">
        <ScoreGauge score={totalScore} />
        <div className={`mt-4 px-6 py-2 rounded-full font-semibold text-white text-lg ${interpretation.colorClass} shadow-md`}>{interpretation.rating.level[language]}</div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-lg text-brand-gray-700">{interpretation.rating.meaning[language]}</p>
        <div className="mt-4 p-4 bg-brand-gray-100 rounded-lg border-l-4 border-brand-green">
            <h4 className="font-bold text-brand-gray-800 flex items-center justify-center gap-2"><i className="fa-solid fa-rocket"></i> {language === 'en' ? 'Recommended Actions' : 'প্রস্তাবিত পদক্ষেপ'}</h4>
            <p className="text-brand-green-dark font-medium">{interpretation.rating.actions[language]}</p>
        </div>
      </div>
      <div className="mt-8">
        <h4 className="text-lg font-bold text-brand-gray-800 mb-2">{language === 'en' ? 'Sector Benchmarks' : 'খাত বেঞ্চমার্ক'}</h4>
        <div className="space-y-2">
            {SECTOR_BENCHMARKS.map(bm => (<div key={bm.sector.en} className="flex justify-between items-center text-sm p-2 bg-brand-gray-50 rounded-md"><span className="text-gray-600">{bm.sector[language]}:</span><span className="font-semibold text-gray-800 bg-brand-gray-200 px-2 py-1 rounded">{bm.score}/100</span></div>))}
        </div>
      </div>
    </div>
  );
};

const InfoSection: React.FC<{ language: Language; }> = ({ language }) => (
    <div className="bg-white rounded-xl shadow-lg p-8 my-8 animate-fade-in-up" style={{animationDelay: '400ms'}}>
        <h2 className="text-2xl font-bold text-brand-green-dark mb-4 flex items-center gap-3"><i className="fa-solid fa-book-open"></i> {language === 'en' ? 'Implementation Guide & Resources' : 'বাস্তবায়ন নির্দেশিকা ও সম্পদ'}</h2>
        <div className="mb-6">
            <h3 className="text-xl font-semibold text-brand-gray-700 mb-2">{language === 'en' ? 'Key Resources in Bangladesh' : 'বাংলাদেশে মূল সম্পদ'}</h3>
            <ul className="list-disc list-inside space-y-2">
                {KEY_RESOURCES.map(res => (<li key={res.name.en} className="text-gray-600"><span className="font-semibold">{res.name[language]}:</span> {res.contact}</li>))}
            </ul>
        </div>
    </div>
);

const LoadingAnimation: React.FC<{language: Language}> = ({language}) => {
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTipIndex(prevIndex => (prevIndex + 1) % LOADING_TIPS.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="relative h-24 w-24">
                <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-green-200 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-4 border-b-transparent border-teal-300 animate-spin" style={{ animationDirection: 'reverse' }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-brand-green text-4xl">
                    <i className="fa-solid fa-seedling"></i>
                </div>
            </div>
            <p className="mt-4 text-gray-600 font-semibold">{language === 'en' ? 'Generating personalized advice...' : 'ব্যক্তিগত পরামর্শ তৈরি করা হচ্ছে...'}</p>
            <div className="mt-4 text-sm text-brand-gray-700 h-12 flex items-center transition-opacity duration-500">
                <p key={currentTipIndex} className="animate-fade-in-up">{LOADING_TIPS[currentTipIndex][language]}</p>
            </div>
        </div>
    );
};

const AIRecommendations: React.FC<{ scores: { [key: string]: number }; assessmentData: Pillar[]; probingAnswers: ProbingAnswers; language: Language; }> = ({ scores, assessmentData, probingAnswers, language }) => {
    const [recommendations, setRecommendations] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const generateRecommendations = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const lowScoringAnswers = assessmentData
                .flatMap(p => p.indicators)
                .filter(indicator => {
                    const score = scores[indicator.id];
                    // FIX: Ensure score is treated as a number in comparison.
                    if (typeof score === 'number') {
                        return score >= 0 && score <= 2;
                    }
                    return false;
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

A business has just completed a sustainability assessment. Based on their profile and low-scoring answers below, provide a set of 3-5 actionable, prioritized recommendations in ${language === 'bn' ? 'Bengali' : 'English'}.

For each recommendation:
1. Provide a clear title.
2. Explain why it's important for their specific business context.
3. Suggest the first practical step they can take.

Focus on low-cost, high-impact suggestions. **Format the entire response as clean, semantic HTML.** Use \`<h3>\` for recommendation titles, \`<p>\` for paragraphs, and \`<ul>\` with \`<li>\` for any lists. Do not include \`\`\`html or any markdown syntax.

Business Profile:
${businessProfile}

Assessment Results (Areas for Improvement):
${lowScoringAnswers}

Now, provide your expert recommendations in HTML format.`;

            const response = await fetch('/.netlify/functions/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                // Add type assertion for the JSON response to handle potential 'unknown' type.
                const errorData = await response.json() as { error?: string };
                throw new Error(errorData.error || `Request failed with status ${response.status}`);
            }

            // Add type assertion for the JSON response to handle potential 'unknown' type.
            const data = await response.json() as { text: string };
            setRecommendations(data.text);

        } catch (e) {
            console.error(e);
            setError(language === 'en' ? 'Failed to generate recommendations. Please try again later.' : 'সুপারিশ তৈরি করতে ব্যর্থ। অনুগ্রহ করে পরে আবার চেষ্টা করুন।');
        } finally {
            setLoading(false);
        }
    }, [scores, assessmentData, probingAnswers, language]);

    useEffect(() => {
        generateRecommendations();
    }, [generateRecommendations]);

    return (
        <div className="bg-green-50/50 rounded-xl shadow-lg p-8 my-8 border-t-4 border-brand-teal animate-fade-in-up" style={{animationDelay: '300ms'}}>
            <h2 className="text-2xl font-bold text-brand-teal mb-4 flex items-center gap-3"><i className="fa-solid fa-robot"></i> {language === 'en' ? 'AI-Generated Recommendations' : 'AI-জেনারেটেড সুপারিশ'}</h2>
            {loading && <LoadingAnimation language={language} />}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <div className="prose prose-green max-w-none" dangerouslySetInnerHTML={{ __html: recommendations }}></div>
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
            <div className="flex flex-col sm:flex-row justify-between items-center mb-2 text-sm md:text-base gap-2">
                <h3 className="font-bold text-brand-green-dark">{language === 'en' ? 'Progress' : 'অগ্রগতি'}</h3>
                <span className="font-semibold text-brand-gray-700">{answeredQuestions} / {totalQuestions} {language === 'en' ? 'Answered' : 'উত্তর'}</span>
                <span className="font-semibold text-brand-gray-700">{language === 'en' ? 'Replacements Left:' : 'প্রতিস্থাপন বাকি:'} <span className="bg-yellow-200 text-yellow-800 font-bold px-2 py-1 rounded-full">{replacementsLeft}</span></span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-brand-teal to-brand-green h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};

const AssessmentScreen: React.FC<{
    assessmentData: Pillar[];
    scores: { [key:string]: number };
    onScoreChange: (id: string, score: number) => void;
    onComplete: () => void;
    language: Language;
    replacementsLeft: number;
    onReplaceQuestion: (pillarId: number, questionId: string) => void;
    fullRankedQuestions: Indicator[];
}> = ({ assessmentData, scores, onScoreChange, onComplete, language, replacementsLeft, onReplaceQuestion, fullRankedQuestions }) => {
    const isComplete = useMemo(() => Object.values(scores).every(score => score > -1), [scores]);
    
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
                disabled={!isComplete}
                className="w-full mt-4 py-4 px-6 bg-brand-green text-white font-bold text-lg rounded-lg shadow-lg hover:bg-brand-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
            >
                <i className="fa-solid fa-chart-pie"></i>
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
    pillarId: number;
}

const pillarColors = [
  'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-indigo-500',
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
        <div className="bg-white rounded-xl shadow-lg p-8 my-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-2xl font-bold text-brand-gray-800 mb-6 text-center flex items-center justify-center gap-3">
                <i className="fa-solid fa-bars-progress"></i> {language === 'en' ? 'Performance by Pillar' : 'স্তম্ভ অনুযায়ী কর্মক্ষমতা'}
            </h3>
            <div className="space-y-4">
                {pillarScores.map((pillar, index) => (
                    <div key={pillar.title}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-brand-gray-700 flex items-center gap-2">
                                <i className={`${PILLAR_ICONS[pillar.pillarId]} text-brand-teal`}></i>
                                {pillar.title}
                            </span>
                            <span className="font-bold text-brand-gray-800">{pillar.weightedScore} / {pillar.weight}</span>
                        </div>
                        <div className="w-full bg-brand-gray-200 rounded-full h-6 overflow-hidden">
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
                pillarId: pillar.id,
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
                <div className="mt-8 space-y-4 animate-fade-in-up" style={{animationDelay: '500ms'}}>
                     <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={handleExportPDF}
                            className="w-full py-3 px-6 bg-red-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                        >
                            <i className="fa-solid fa-file-pdf"></i>
                            {language === 'en' ? 'Export PDF' : 'পিডিএফ এক্সপোর্ট'}
                        </button>
                        <button
                            onClick={handleExportCSV}
                            className="w-full py-3 px-6 bg-brand-green text-white font-bold text-lg rounded-lg shadow-md hover:bg-brand-green-dark transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                        >
                            <i className="fa-solid fa-file-csv"></i>
                            {language === 'en' ? 'Export CSV' : 'সিএসভি এক্সপোর্ট'}
                        </button>
                    </div>
                    <button
                        onClick={onStartOver}
                        className="w-full py-3 px-6 bg-brand-gray-700 text-white font-bold text-lg rounded-lg shadow-md hover:bg-brand-gray-800 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                    >
                        <i className="fa-solid fa-rotate-right"></i>
                        {language === 'en' ? 'Start Over' : 'আবার শুরু করুন'}
                    </button>
                </div>
            )}
            {isExporting && (
                <div className="text-center p-8 text-brand-gray-700 font-semibold">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green mx-auto"></div>
                    <p className="mt-4">{language === 'en' ? 'Generating PDF...' : 'পিডিএফ তৈরি করা হচ্ছে...'}</p>
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
    <div className="min-h-screen bg-brand-gray-50 text-brand-gray-800 font-sans">
       <header className="relative text-white p-6 shadow-md h-64 flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593113633219-bc0741916323?q=80&w=2070&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-brand-green/70"></div>
          <div className="relative container mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-shadow-lg">{language === 'en' ? 'Green Business Assessment Tool' : 'সবুজ ব্যবসায়িক মূল্যায়ন সরঞ্জাম'}</h1>
              <p className="text-lg md:text-xl mt-2 opacity-90 text-shadow-md">{language === 'en' ? 'For Bangladeshi SMEs' : 'বাংলাদেশের ছোট ও মাঝারি শিল্পের জন্য'}</p>
          </div>
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
      </header>

      <main className="container mx-auto p-4 lg:p-8 -mt-20 relative z-10">
        {renderContent()}
      </main>
      
      <footer className="bg-brand-gray-800 text-white text-center p-4 mt-8">
          <p>&copy; 2024 Sustainable Business Research Bangladesh. Version 4.0</p>
      </footer>
    </div>
  );
}