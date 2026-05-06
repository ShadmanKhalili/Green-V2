// =============================================================================
// Recommendation Engine
//
// From BWM doc Step 6:
//  1. Top 3 domains where pct < 0.50 AND multiplier ≥ 3 → Priority Improvement Areas
//  2. Top 3 domains where pct ≥ 0.75 → Green Strengths to Communicate
//  3. Low-cost actions (no investment) vs investment actions, separately
//  4. Certification pathways: % of pathway-relevant questions scored ≥ 3
// =============================================================================

import { MainQuestion, LocalizedString, DomainCode, WeightPriority } from '../../types';
import { BwmResult } from './bwm';

const DOMAIN_NAMES: Record<DomainCode, LocalizedString> = {
  D1: { en: 'Energy & emissions', bn: 'শক্তি ও নির্গমন' },
  D2: { en: 'Water & wastewater', bn: 'জল ও বর্জ্য জল' },
  D3: { en: 'Waste & circularity', bn: 'বর্জ্য ও সার্কুলারিটি' },
  D4: { en: 'Materials & chemicals', bn: 'উপকরণ ও রাসায়নিক' },
  D5: { en: 'Land, soil & biodiversity', bn: 'জমি, মাটি ও জীববৈচিত্র্য' },
  D6: { en: 'Workplace & local safety', bn: 'কর্মক্ষেত্র ও স্থানীয় নিরাপত্তা' },
  D7: { en: 'Management & records', bn: 'ব্যবস্থাপনা ও রেকর্ড' },
  D8: { en: 'Finance & certification', bn: 'অর্থায়ন ও সার্টিফিকেশন' },
};

// -----------------------------------------------------------------------------
// Investment vs low-cost classifier — keyword match on EN question text
// -----------------------------------------------------------------------------
const INVESTMENT_KEYWORDS = [
  'solar', 'efficient', 'led', 'biogas', 'replace', 'install', 'invest',
  'etp', 'treatment', 'treat', 'compost pit', 'rainwater', 'cold room',
  'refrigerator', 'freezer', 'cooling', 'compressor', 'boiler', 'dryer',
  'machinery', 'motor', 'pump', 'cleaner technology', 'roof insulation',
  'reflective', 'shading', 'ventilation', 'biogas plant', 'covered pit',
  'equipment', 'cleaner vehicles', 'cng', 'electric vehicles',
];

function isInvestmentAction(q: MainQuestion): boolean {
  const lowerText = q.text.en.toLowerCase();
  const lowerFinance = (q.financeLink?.en ?? '').toLowerCase();
  return INVESTMENT_KEYWORDS.some(kw => lowerText.includes(kw) || lowerFinance.includes(kw));
}

// -----------------------------------------------------------------------------
// Certification pathway flagging — keywords in financeLink
// -----------------------------------------------------------------------------
interface PathwayDef {
  key: 'iso14001' | 'organic' | 'leed' | 'buyer' | 'circular';
  name: LocalizedString;
  description: LocalizedString;
  matches: (q: MainQuestion) => boolean;
}

const PATHWAYS: PathwayDef[] = [
  {
    key: 'iso14001',
    name: { en: 'ISO 14001 readiness', bn: 'ISO 14001 প্রস্তুতি' },
    description: {
      en: 'Environmental management system structure — records, monitoring, continual improvement.',
      bn: 'পরিবেশ ব্যবস্থাপনা পদ্ধতির কাঠামো — রেকর্ড, মনিটরিং, ক্রমাগত উন্নতি।'
    },
    matches: (q) => /ISO\s*14001/i.test(q.financeLink?.en ?? '')
  },
  {
    key: 'organic',
    name: { en: 'Organic / safe agriculture', bn: 'অর্গানিক / নিরাপদ কৃষি' },
    description: {
      en: 'Organic or reduced-chemical agriculture certification readiness.',
      bn: 'অর্গানিক বা কম-রাসায়নিক কৃষি সার্টিফিকেশন প্রস্তুতি।'
    },
    matches: (q) => /organic|safe agriculture|safe food/i.test(q.financeLink?.en ?? '')
  },
  {
    key: 'leed',
    name: { en: 'Green building (LEED/EDGE)', bn: 'গ্রিন বিল্ডিং (LEED/EDGE)' },
    description: {
      en: 'Building/facility readiness — energy, water, ventilation, materials.',
      bn: 'ভবন/সুবিধা প্রস্তুতি — শক্তি, জল, বায়ুচলাচল, উপকরণ।'
    },
    matches: (q) => /leed|edge|green building/i.test(q.financeLink?.en ?? '')
  },
  {
    key: 'buyer',
    name: { en: 'Buyer / export compliance', bn: 'ক্রেতা / রপ্তানি কমপ্লায়েন্স' },
    description: {
      en: 'International textile/garment buyer audit readiness.',
      bn: 'আন্তর্জাতিক টেক্সটাইল/গার্মেন্টস ক্রেতার অডিট প্রস্তুতি।'
    },
    matches: (q) => /buyer|FEM|Higg|export/i.test(q.financeLink?.en ?? '')
  },
  {
    key: 'circular',
    name: { en: 'Circular economy readiness', bn: 'সার্কুলার অর্থনীতির প্রস্তুতি' },
    description: {
      en: 'Reuse, recycling, by-product utilization, waste-to-resource pathway.',
      bn: 'পুনঃব্যবহার, রিসাইক্লিং, উপজাত ব্যবহার, বর্জ্য থেকে সম্পদে পথ।'
    },
    matches: (q) => /circular/i.test(q.financeLink?.en ?? '')
  },
];

// -----------------------------------------------------------------------------
// Output types
// -----------------------------------------------------------------------------
export interface PriorityArea {
  domain: DomainCode;
  domainName: LocalizedString;
  pct: number;       // 0..1
  multiplier: number;
  impact: number;    // multiplier * (1 - pct), used for ranking
}

export interface Strength {
  domain: DomainCode;
  domainName: LocalizedString;
  pct: number;
}

export interface ActionItem {
  questionId: string;
  text: LocalizedString;
  domain: DomainCode;
  domainName: LocalizedString;
  financeLink?: LocalizedString;
  weightPriority: WeightPriority;
  score: number;          // current score 0..4
  isCritical: boolean;
}

export interface CertificationReadiness {
  key: string;
  name: LocalizedString;
  description: LocalizedString;
  pct: number;            // 0..1, fraction of pathway-relevant questions scored ≥ 3
  applicableCount: number;
  achievingCount: number;
}

export interface Recommendations {
  priorityAreas: PriorityArea[];          // top 3
  strengths: Strength[];                   // top 3
  criticalRisks: ActionItem[];             // ALL triggered Very High questions scored 0/1
  lowCostActions: ActionItem[];            // top up-to-5
  investmentActions: ActionItem[];         // top up-to-5
  certificationPathways: CertificationReadiness[]; // those with applicableCount > 0
}

// -----------------------------------------------------------------------------
// Main entry
// -----------------------------------------------------------------------------
export function generateRecommendations(
  applicableQuestions: MainQuestion[],
  scores: Record<string, number>,
  bwm: BwmResult
): Recommendations {
  const multipliers = bwm.multipliersUsed;

  // ---- Priority Areas: pct < 0.50 AND multiplier >= 3 ----
  const priorityAreas: PriorityArea[] = [];
  (Object.keys(bwm.domainPercentages) as DomainCode[]).forEach(d => {
    const pct = bwm.domainPercentages[d] ?? 0;
    const m = multipliers[d] ?? 0;
    if (pct < 0.5 && m >= 3) {
      priorityAreas.push({
        domain: d,
        domainName: DOMAIN_NAMES[d],
        pct,
        multiplier: m,
        impact: m * (1 - pct),
      });
    }
  });
  priorityAreas.sort((a, b) => b.impact - a.impact);

  // ---- Strengths: pct >= 0.75 ----
  const strengths: Strength[] = [];
  (Object.keys(bwm.domainPercentages) as DomainCode[]).forEach(d => {
    const pct = bwm.domainPercentages[d] ?? 0;
    if (pct >= 0.75) {
      strengths.push({ domain: d, domainName: DOMAIN_NAMES[d], pct });
    }
  });
  strengths.sort((a, b) => b.pct - a.pct);

  // ---- Score-driven action items ----
  // Build a list of all answered (score 0..4, non-Pathway) questions sorted by lowness
  const answered: ActionItem[] = applicableQuestions
    .filter(q => {
      const s = scores[q.id];
      return typeof s === 'number' && s >= 0 && s <= 4 && q.weightPriority !== 'Pathway';
    })
    .map(q => ({
      questionId: q.id,
      text: q.text,
      domain: q.domain,
      domainName: DOMAIN_NAMES[q.domain],
      financeLink: q.financeLink,
      weightPriority: q.weightPriority,
      score: scores[q.id],
      isCritical: q.criticalRisk === true || q.weightPriority === 'Very High',
    }));

  // ---- Critical risks: triggered Very High at score 0 or 1, sorted by score asc ----
  const criticalRisks = answered
    .filter(a => a.isCritical && (a.score === 0 || a.score === 1))
    .sort((a, b) => a.score - b.score);

  // ---- Improvement actions: questions with score 0..2 (room to improve) ----
  // Rank: critical first, then by (priorityWeight × (4 - score))
  const weightNumber = (p: WeightPriority): number => ({ 'Very High': 4, High: 3, Medium: 2, Low: 1, Pathway: 0 } as const)[p];
  const improvementCandidates = answered
    .filter(a => a.score <= 2)
    .map(a => ({
      ...a,
      rank: (a.isCritical ? 100 : 0) + weightNumber(a.weightPriority) * (4 - a.score),
    }))
    .sort((a, b) => b.rank - a.rank);

  const lowCostActions: ActionItem[] = [];
  const investmentActions: ActionItem[] = [];
  improvementCandidates.forEach(c => {
    const q = applicableQuestions.find(x => x.id === c.questionId);
    if (!q) return;
    const target = isInvestmentAction(q) ? investmentActions : lowCostActions;
    if (target.length < 5) target.push(c);
  });

  // ---- Certification pathways ----
  const certificationPathways: CertificationReadiness[] = [];
  PATHWAYS.forEach(p => {
    const matchingQs = applicableQuestions.filter(p.matches);
    if (matchingQs.length === 0) return;
    const achieving = matchingQs.filter(q => {
      const s = scores[q.id];
      return typeof s === 'number' && s >= 3;
    }).length;
    certificationPathways.push({
      key: p.key,
      name: p.name,
      description: p.description,
      pct: achieving / matchingQs.length,
      applicableCount: matchingQs.length,
      achievingCount: achieving,
    });
  });

  // Sort cert pathways by pct desc
  certificationPathways.sort((a, b) => b.pct - a.pct);

  return {
    priorityAreas: priorityAreas.slice(0, 3),
    strengths: strengths.slice(0, 3),
    criticalRisks,
    lowCostActions,
    investmentActions,
    certificationPathways,
  };
}
