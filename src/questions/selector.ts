import { MainQuestion, WeightPriority } from '../../types';

// =============================================================================
// Curated Quota Selector
//
// Spec source: temp_docs/Green Business Assessment Tool.docx (1).md §"Minimum
// Main Questionnaire Composition" (line 120). Each business should receive
// 20–30 questions split into curated buckets, plus auto-included critical-risk
// questions. The routingCondition gate is too coarse on its own — it activates
// whole modules — so this selector picks the top-priority subset per bucket.
// =============================================================================

const BUCKET_QUOTAS = {
  universal: 8,        // spec: 6–8
  sector: 12,          // spec: 8–12
  footprint: 8,        // spec: 5–8 (energy + water + waste + chemicals combined)
  finance: 4,          // spec: 2–4 (MG module / D8 questions)
} as const;

const SECTOR_PREFIXES = ['AG', 'LV', 'FP', 'TX', 'RT', 'FS', 'WK', 'PP', 'TR', 'BF'];
const FOOTPRINT_PREFIXES = ['EN', 'WA', 'WS', 'CH'];

type Bucket = 'universal' | 'sector' | 'footprint' | 'finance' | 'other';

function getPrefix(id: string): string {
  return id.split('-')[0];
}

function bucketOf(q: MainQuestion): Bucket {
  const p = getPrefix(q.id);
  if (p === 'U') return 'universal';
  if (SECTOR_PREFIXES.includes(p)) return 'sector';
  if (FOOTPRINT_PREFIXES.includes(p)) return 'footprint';
  if (p === 'MG') return 'finance';
  return 'other';
}

const PRIORITY_RANK: Record<WeightPriority, number> = {
  'Very High': 4,
  'High': 3,
  'Medium': 2,
  'Low': 1,
  'Pathway': 0,
};

function comparePriority(a: MainQuestion, b: MainQuestion): number {
  const diff = PRIORITY_RANK[b.weightPriority] - PRIORITY_RANK[a.weightPriority];
  if (diff !== 0) return diff;
  return a.id.localeCompare(b.id); // stable, deterministic tiebreak
}

/**
 * Reduce the routing-matched set to a curated 20–32 question subset per the
 * spec's bucket quotas. Critical-risk questions (criticalRisk: true) that
 * passed routing are always auto-included regardless of bucket quota.
 */
export function selectCuratedQuestions(applicable: MainQuestion[]): MainQuestion[] {
  const selectedIds = new Set<string>();
  const selected: MainQuestion[] = [];

  // 1. Auto-include all critical-risk questions that passed routing
  for (const q of applicable) {
    if (q.criticalRisk === true) {
      selectedIds.add(q.id);
      selected.push(q);
    }
  }

  // 2. For each bucket, fill remaining quota by priority
  const byBucket: Record<Bucket, MainQuestion[]> = {
    universal: [], sector: [], footprint: [], finance: [], other: [],
  };
  for (const q of applicable) {
    byBucket[bucketOf(q)].push(q);
  }

  const fillBucket = (bucket: keyof typeof BUCKET_QUOTAS) => {
    const quota = BUCKET_QUOTAS[bucket];
    const alreadyInBucket = byBucket[bucket].filter(q => selectedIds.has(q.id)).length;
    const remaining = Math.max(0, quota - alreadyInBucket);
    if (remaining === 0) return;

    const candidates = byBucket[bucket]
      .filter(q => !selectedIds.has(q.id))
      .sort(comparePriority)
      .slice(0, remaining);

    for (const q of candidates) {
      selectedIds.add(q.id);
      selected.push(q);
    }
  };

  fillBucket('universal');
  fillBucket('sector');
  fillBucket('footprint');
  fillBucket('finance');

  return selected;
}
