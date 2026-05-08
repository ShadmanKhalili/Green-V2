// =============================================================================
// BWM Scoring Engine — Best-Worst Method, sector-aware
//
// Implements the algorithm from the official BWM AI Scoring Guide:
//  1. Sector identification from P9 → look up domain multipliers
//  2. Critical-risk override: any Very High question scored 0 or 1 caps at 40%
//  3. Domain pct = Σ(score × intra_weight) / Σ(4 × intra_weight)
//  4. Weighted green score = Σ(domain_pct × multiplier) / Σ(multiplier) × 100
//  5. Evidence bonus: questions scored 4 / total applicable × 5 (max +5%)
//
// D8 (finance/cert) is a PATHWAY dimension — excluded from score, used only
// for recommendation pathway. Pathway-weighted questions never enter the score.
// =============================================================================

import { MainQuestion, ProbingAnswers, WeightPriority, DomainCode } from '../../types';

export const CRITICAL_RISK_CAP = 40;
export const EVIDENCE_BONUS_MAX = 5;

type DomainMultipliers = Partial<Record<DomainCode, number>>;

// -----------------------------------------------------------------------------
// Sector multipliers — keyed by exact P9 sub_sector_activity string
// 0 means N/A (excluded from denominator)
// -----------------------------------------------------------------------------
const DAIRY:        DomainMultipliers = { D1: 1.5, D2: 2.5, D3: 5.0, D4: 1.0, D5: 5.0, D6: 3.5, D7: 2.0 };
const POULTRY:      DomainMultipliers = { D1: 2.5, D2: 2.0, D3: 5.0, D4: 1.0, D5: 3.0, D6: 5.0, D7: 1.5 };
const FISH:         DomainMultipliers = { D1: 2.5, D2: 5.0, D3: 2.0, D4: 5.0, D5: 3.0, D6: 1.5, D7: 1.0 };
const CROP:         DomainMultipliers = { D1: 1.5, D2: 3.0, D3: 2.0, D4: 5.0, D5: 5.0, D6: 1.5, D7: 1.0 };
const RICE_MILL:    DomainMultipliers = { D1: 5.0, D2: 1.0, D3: 3.0, D4: 1.5, D5: 0,   D6: 2.5, D7: 2.0 };
const FOOD_PROC:    DomainMultipliers = { D1: 5.0, D2: 3.0, D3: 5.0, D4: 1.5, D5: 0,   D6: 2.0, D7: 1.0 };
const GARMENT:      DomainMultipliers = { D1: 3.0, D2: 1.0, D3: 5.0, D4: 1.5, D5: 0,   D6: 2.0, D7: 2.0 };
const DYEING:       DomainMultipliers = { D1: 2.5, D2: 5.0, D3: 2.0, D4: 5.0, D5: 0,   D6: 3.0, D7: 1.0 };
const RETAIL:       DomainMultipliers = { D1: 3.0, D2: 1.0, D3: 5.0, D4: 2.5, D5: 0,   D6: 1.5, D7: 2.0 };
const RESTAURANT:   DomainMultipliers = { D1: 5.0, D2: 2.5, D3: 5.0, D4: 1.0, D5: 0,   D6: 2.5, D7: 1.5 };
const REPAIR_WS:    DomainMultipliers = { D1: 2.0, D2: 2.5, D3: 5.0, D4: 5.0, D5: 0,   D6: 3.0, D7: 1.0 };
const TRANSPORT:    DomainMultipliers = { D1: 5.0, D2: 1.0, D3: 2.0, D4: 3.5, D5: 0,   D6: 1.5, D7: 1.5 };
const COLD_CHAIN:   DomainMultipliers = { D1: 5.0, D2: 1.0, D3: 1.5, D4: 3.5, D5: 0,   D6: 2.0, D7: 2.5 };
const PLASTIC_PKG:  DomainMultipliers = { D1: 2.0, D2: 3.0, D3: 5.0, D4: 5.0, D5: 0,   D6: 3.0, D7: 1.0 };

// Sector-not-matched fallback — equal weight across non-D5 domains
const DEFAULT_MULTIPLIERS: DomainMultipliers = { D1: 3.0, D2: 3.0, D3: 3.0, D4: 3.0, D5: 0, D6: 3.0, D7: 3.0 };

// -----------------------------------------------------------------------------
// P9 sub-sector → multiplier mapping
// -----------------------------------------------------------------------------
export const SECTOR_MULTIPLIERS: Record<string, DomainMultipliers> = {
  // Livestock
  'Dairy farm': DAIRY,
  'Cattle fattening': DAIRY,
  'Goat/sheep rearing': DAIRY,
  'Poultry farm': POULTRY,
  'Duck farm': POULTRY,
  'Fish farming / aquaculture': FISH,
  'Hatchery': FISH,
  'Mixed livestock/fisheries': DAIRY,

  // Agriculture
  'Rice farming': CROP,
  'Vegetable farming': CROP,
  'Fruit farming': CROP,
  'Flower or nursery business': CROP,
  'Seedling production': CROP,
  'Mixed crop farming': CROP,
  'Other crop/agriculture activity': CROP,

  // Manufacturing / Food Processing
  'Rice mill / husking': RICE_MILL,
  'Food processing': FOOD_PROC,
  'Bakery / snacks / sweets production': FOOD_PROC,
  'Spice grinding / oil processing': FOOD_PROC,
  'Furniture / wood products': PLASTIC_PKG, // wood dust, varnish, similar profile
  'Brick/block/construction material': { D1: 5.0, D2: 2.0, D3: 4.0, D4: 1.5, D5: 0, D6: 4.0, D7: 1.5 },
  'Small chemical or detergent production': { D1: 3.0, D2: 4.0, D3: 3.0, D4: 5.0, D5: 0, D6: 4.0, D7: 2.0 },
  'Other manufacturing': FOOD_PROC,

  // Textile
  'Tailoring': GARMENT,
  'Small garment production': GARMENT,
  'Embroidery': GARMENT,
  'Dyeing': DYEING,
  'Washing': DYEING,
  'Printing': DYEING, // textile printing — chemicals/wastewater profile
  'Textile waste/recycling': GARMENT,
  'Other textile activity': GARMENT,

  // Retail / Trade
  'Grocery shop': RETAIL,
  'Pharmacy': RETAIL,
  'Clothing shop': RETAIL,
  'Hardware shop': RETAIL,
  'Electronics shop': RETAIL,
  'Agricultural input shop': RETAIL,
  'Wholesale trading': RETAIL,
  'Market stall': RETAIL,
  'Other retail/trade': RETAIL,

  // Food Service
  'Tea stall / small food stall': RESTAURANT,
  'Restaurant': RESTAURANT,
  'Catering': RESTAURANT,
  'Bakery outlet': RESTAURANT,
  'Hotel / guesthouse': RESTAURANT,
  'Street food business': RESTAURANT,
  'Other food service': RESTAURANT,

  // Transport
  'Goods transport': TRANSPORT,
  'Passenger transport': TRANSPORT,
  'Delivery service': TRANSPORT,
  'Cold storage / cold chain': COLD_CHAIN,
  'Warehouse': { D1: 4.0, D2: 1.5, D3: 3.0, D4: 3.0, D5: 0, D6: 2.0, D7: 2.0 },
  'Courier/logistics': TRANSPORT,

  // Repair / Workshop
  'Welding workshop': REPAIR_WS,
  'Vehicle repair': REPAIR_WS,
  'Machinery repair': REPAIR_WS,
  'Metal fabrication': REPAIR_WS,
  'Electrical/electronics repair': REPAIR_WS,
  'Bicycle/rickshaw/three-wheeler repair': REPAIR_WS,
  'Other workshop': REPAIR_WS,

  // Plastic / Packaging / Printing
  'Plastic product manufacturing': PLASTIC_PKG,
  'Packaging production': PLASTIC_PKG,
  'Printing press': PLASTIC_PKG,
  'Recycling / waste collection': PLASTIC_PKG,
  'Paper/cardboard packaging': PLASTIC_PKG,
};

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
function intraWeight(priority: WeightPriority): number {
  switch (priority) {
    case 'Very High': return 4;
    case 'High':      return 3;
    case 'Medium':    return 2;
    case 'Low':       return 1;
    case 'Pathway':   return 0;
  }
}

function lookupMultipliers(probingAnswers: ProbingAnswers): { multipliers: DomainMultipliers; sectorMatched: string | null } {
  const subSector = probingAnswers['P9'] as string | undefined;
  if (subSector && SECTOR_MULTIPLIERS[subSector]) {
    return { multipliers: SECTOR_MULTIPLIERS[subSector], sectorMatched: subSector };
  }
  return { multipliers: DEFAULT_MULTIPLIERS, sectorMatched: null };
}

export function getApplicableQuestions(allQuestions: MainQuestion[], probingAnswers: ProbingAnswers): MainQuestion[] {
  return allQuestions.filter(q => {
    try {
      return q.routingCondition(probingAnswers);
    } catch {
      return false;
    }
  });
}

// -----------------------------------------------------------------------------
// Result type
// -----------------------------------------------------------------------------
export interface BwmResult {
  /** Final 0-100 score after risk cap and evidence bonus, rounded */
  greenScore: number;
  /** Score before risk cap and evidence bonus */
  rawGreenScore: number;
  /** True if any Very High question was answered 0 or 1 */
  riskFlag: boolean;
  /** IDs of Very High questions that triggered the flag */
  triggeredRiskQuestions: string[];
  /** Domain percentages 0-1 (e.g. D3: 0.25 = 25%) for domains with answered questions */
  domainPercentages: Partial<Record<DomainCode, number>>;
  /** Multipliers in use for this assessment (after sector lookup) */
  multipliersUsed: DomainMultipliers;
  /** Evidence bonus added (0-5) */
  evidenceBonus: number;
  /** Sector key from SECTOR_MULTIPLIERS, or null if fallback used */
  sectorMatched: string | null;
  /** Number of questions that the routing layer made applicable */
  applicableQuestionCount: number;
  /** Number of those that have a real score (0..4) */
  answeredQuestionCount: number;
  /** Number scored exactly 4 (proof) */
  evidenceQuestionCount: number;
}

// -----------------------------------------------------------------------------
// Main scoring function
// -----------------------------------------------------------------------------
export function calculateBwmScore(
  applicableQuestions: MainQuestion[],
  scores: Record<string, number>,
  probingAnswers: ProbingAnswers
): BwmResult {
  const { multipliers, sectorMatched } = lookupMultipliers(probingAnswers);

  // ---- Pass 1: per-domain accumulation ----
  const domainSum: Partial<Record<DomainCode, number>> = {};
  const domainMax: Partial<Record<DomainCode, number>> = {};
  const triggered: string[] = [];

  let answeredCount = 0;
  let evidenceCount = 0;

  for (const q of applicableQuestions) {
    const score = scores[q.id];
    const isAnswered = typeof score === 'number' && score >= 0 && score <= 4; // -1 N/A, -2 unanswered

    if (q.weightPriority === 'Pathway') continue; // never count toward score
    if (q.domain === 'D8') continue;              // pathway dimension, excluded

    if (!isAnswered) continue;

    answeredCount += 1;
    if (score === 4) evidenceCount += 1;

    // Critical-risk check on Very High questions answered 0 or 1
    const isCritical = q.criticalRisk === true || q.weightPriority === 'Very High';
    if (isCritical && (score === 0 || score === 1)) {
      triggered.push(q.id);
    }

    const w = intraWeight(q.weightPriority);
    if (w === 0) continue;

    const d = q.domain as DomainCode;
    domainSum[d] = (domainSum[d] ?? 0) + score * w;
    domainMax[d] = (domainMax[d] ?? 0) + 4 * w;
  }

  // ---- Pass 2: domain percentages (only domains with answered questions) ----
  const domainPct: Partial<Record<DomainCode, number>> = {};
  (Object.keys(domainMax) as DomainCode[]).forEach(d => {
    const max = domainMax[d] ?? 0;
    const sum = domainSum[d] ?? 0;
    if (max > 0) domainPct[d] = sum / max;
  });

  // ---- Pass 3: multiplier-weighted aggregate ----
  let num = 0;
  let denom = 0;
  (Object.keys(domainPct) as DomainCode[]).forEach(d => {
    const m = multipliers[d];
    if (typeof m !== 'number' || m <= 0) return;
    num += (domainPct[d] ?? 0) * m;
    denom += m;
  });

  const rawGreenScore = denom > 0 ? (num / denom) * 100 : 0;

  // ---- Pass 4: critical-risk cap ----
  const riskFlag = triggered.length > 0;
  let scoreAfterCap = rawGreenScore;
  if (riskFlag) scoreAfterCap = Math.min(rawGreenScore, CRITICAL_RISK_CAP);

  // ---- Pass 5: evidence bonus ----
  const evidenceBonus = answeredCount > 0
    ? Math.min(EVIDENCE_BONUS_MAX, (evidenceCount / answeredCount) * EVIDENCE_BONUS_MAX)
    : 0;

  const finalRaw = Math.min(100, scoreAfterCap + evidenceBonus);
  const greenScore = Math.round(finalRaw);

  return {
    greenScore,
    rawGreenScore: Math.round(rawGreenScore * 10) / 10,
    riskFlag,
    triggeredRiskQuestions: triggered,
    domainPercentages: domainPct,
    multipliersUsed: multipliers,
    evidenceBonus: Math.round(evidenceBonus * 10) / 10,
    sectorMatched,
    applicableQuestionCount: applicableQuestions.length,
    answeredQuestionCount: answeredCount,
    evidenceQuestionCount: evidenceCount,
  };
}
