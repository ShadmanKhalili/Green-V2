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

// --- New types for Probing Questions ---

export interface ProbingQuestionOption {
    value: string;
    text: LocalizedString;
}

export interface ProbingQuestion {
    id: string;
    backendTag: string;
    type: 'text' | 'select' | 'checkbox';
    text: LocalizedString;
    options?: ProbingQuestionOption[];
    dependsOn?: (answers: ProbingAnswers) => boolean;
}

export interface ProbingAnswers {
    [key: string]: string | string[];
}

export type WeightPriority = 'Very High' | 'High' | 'Medium' | 'Low' | 'Pathway';

export interface MainQuestion {
    id: string;
    text: LocalizedString;
    domain: string;
    weightPriority: WeightPriority;
    evidenceExamples?: LocalizedString;
    financeLink?: LocalizedString;
    routingCondition: (answers: ProbingAnswers) => boolean;
}

export interface Domain {
    code: string;
    name: LocalizedString;
}
