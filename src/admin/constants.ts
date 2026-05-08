import { Timestamp } from 'firebase/firestore';
import { MAIN_QUESTIONS } from '../../questionBank';
import type { MainQuestion } from '../../types';

export const SUPER_ADMIN_EMAIL = 'capecconsulting@gmail.com';

export function tsToDate(ts: any): Date {
  if (!ts) return new Date(0);
  if (ts instanceof Timestamp) return ts.toDate();
  if (typeof ts.seconds === 'number') return new Date(ts.seconds * 1000);
  return new Date(ts);
}

export const MAIN_QUESTIONS_BY_ID: ReadonlyMap<string, MainQuestion> = new Map(
  MAIN_QUESTIONS.map(q => [q.id, q])
);
