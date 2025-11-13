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
    type: 'select' | 'checkbox';
    text: LocalizedString;
    options: ProbingQuestionOption[];
}

export interface ProbingAnswers {
    [key: string]: string | string[];
}

// --- New type for loading tips ---

export interface LoadingTip {
  en: string;
  bn: string;
}
