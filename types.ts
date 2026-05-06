export type Language = 'en' | 'bn';

export interface LocalizedString {
  en: string;
  bn: string;
}

export interface ScoringOption {
  score: number;
  description: LocalizedString;
}

export interface Indicator {
  id: string;
  pillarId: number;
  tags: string[];
  text: LocalizedString;
  scoringGuide: ScoringOption[];
  maxScore: number;
}

export interface Pillar {
  id: number;
  title: LocalizedString;
  points: number;
  indicators: Indicator[];
  notes?: LocalizedString;
}

export interface Rating {
  level: LocalizedString;
  meaning: LocalizedString;
  actions: LocalizedString;
}

export interface ScoreInterpretation {
  minScore: number;
  rating: Rating;
  colorClass: string;
  textColor: string;
}

export interface Resource {
    name: LocalizedString;
    contact: string;
}

export interface SuccessStory {
    title: LocalizedString;
    scoreImprovement: LocalizedString;
    actions: LocalizedString;
    results: LocalizedString;
}

// --- Probing question types ---

export interface ProbingQuestionOption {
    value: string;
    text: LocalizedString;
}

export interface ProbingQuestion {
    id: string;
    backendTag: string;
    type: 'text' | 'select' | 'checkbox' | 'location' | 'photo' | 'signature';
    text: LocalizedString;
    options?: ProbingQuestionOption[] | ((answers: ProbingAnswers) => ProbingQuestionOption[]);
    dependsOn?: (answers: ProbingAnswers) => boolean;
}

export interface ProbingAnswers {
    [key: string]: any;
}

export type WeightPriority = 'Very High' | 'High' | 'Medium' | 'Low' | 'Pathway';

export type DomainCode = 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6' | 'D7' | 'D8';

export interface MainQuestion {
    id: string;
    text: LocalizedString;
    domain: DomainCode;
    weightPriority: WeightPriority;
    evidenceExamples?: LocalizedString;
    financeLink?: LocalizedString;
    routingCondition: (answers: ProbingAnswers) => boolean;
    /** True for "Very High" priority questions on the BWM critical-risk override list. Score 0 or 1 caps total at 40%. */
    criticalRisk?: boolean;
}

export interface Domain {
    code: DomainCode;
    name: LocalizedString;
    icon?: string;
}
