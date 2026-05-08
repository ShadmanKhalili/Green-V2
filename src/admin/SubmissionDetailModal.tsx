import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { DOMAINS } from '../../questionBank';
import { PROBING_QUESTIONS } from '../../constants';
import { MAIN_QUESTIONS_BY_ID, tsToDate } from './constants';

interface Props {
  submission: any | null;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

const Section: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
        <i className={`fa-solid ${icon} text-sm`}></i>
      </div>
      <h4 className="text-sm font-black uppercase tracking-widest text-gray-700">{title}</h4>
    </div>
    {children}
  </div>
);

export const SubmissionDetailModal: React.FC<Props> = ({ submission, onClose, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setConfirmDelete(false);
  }, [submission?.id]);

  if (!submission) return null;

  const created = tsToDate(submission.createdAt);

  const probing = submission.probingAnswers || {};
  const scores = submission.scores || {};
  const bwm = submission.bwm || null;
  const evidenceImages: string[] = Array.isArray(submission.evidenceImages) ? submission.evidenceImages : [];
  const signature: string | null = submission.signature || null;
  const metadata = submission.metadata || {};

  const handleDelete = () => {
    if (!onDelete) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    onDelete(submission.id);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-start justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full my-8"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                {probing.P1 || probing.biz_name || 'Untitled SME'}
              </h3>
              <p className="text-xs text-gray-400 font-mono mt-1">{submission.id}</p>
              <p className="text-xs text-gray-500 mt-1">
                Submitted {format(created, 'MMM dd, yyyy HH:mm')} · Enumerator {submission.enumeratorId?.slice(0, 8) || '—'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    confirmDelete
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                  }`}
                >
                  <i className="fa-solid fa-trash mr-1"></i>
                  {confirmDelete ? 'Click again to confirm' : 'Delete'}
                </button>
              )}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Score Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-5 rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Score</p>
                <p className="text-3xl font-black mt-1">{submission.totalScore || 0}%</p>
              </div>
              {bwm && (
                <>
                  <div className="bg-gray-900 text-white p-5 rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Green Score (BWM)</p>
                    <p className="text-3xl font-black mt-1">{bwm.greenScore}%</p>
                    {bwm.riskFlag && (
                      <p className="text-[10px] mt-1 text-red-300 font-bold">⚠ Risk capped</p>
                    )}
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sector matched</p>
                    <p className="text-sm font-bold text-gray-900 mt-1 truncate">{bwm.sectorMatched || '—'}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Evidence bonus</p>
                    <p className="text-2xl font-black text-green-600 mt-1">+{bwm.evidenceBonus || 0}%</p>
                  </div>
                </>
              )}
            </div>

            {/* Probing Answers */}
            <Section title="Business Profile (Probing)" icon="fa-clipboard-question">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {PROBING_QUESTIONS.map(q => {
                  const v = probing[q.id];
                  if (v === undefined || v === null || v === '' || v === 'default') return null;
                  return (
                    <div key={q.id} className="bg-white p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{q.id} · {q.backendTag}</p>
                      <p className="text-xs text-gray-600 mt-1">{q.text.en}</p>
                      <p className="text-sm font-bold text-gray-900 mt-2">
                        {Array.isArray(v) ? v.join(', ') : String(v)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Scores by Domain */}
            <Section title="Scores by Domain" icon="fa-chart-column">
              <div className="space-y-4">
                {DOMAINS.map(d => {
                  const domainScores = Object.entries(scores)
                    .filter(([qId]) => qId.startsWith(d.code))
                    .map(([qId, s]) => ({ qId, score: s as number }));
                  if (domainScores.length === 0) return null;

                  const avg = domainScores.reduce((sum, x) => sum + (x.score >= 0 ? x.score : 0), 0) / domainScores.length;
                  const domainPct = bwm?.domainPercentages?.[d.code];

                  return (
                    <div key={d.code} className="bg-white p-4 rounded-xl border border-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-indigo-600">{d.code}</p>
                          <p className="text-sm font-bold text-gray-900">{d.name.en}</p>
                        </div>
                        <div className="text-right">
                          {domainPct !== undefined && (
                            <p className="text-2xl font-black text-gray-900">{Math.round(domainPct)}%</p>
                          )}
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            avg {avg.toFixed(2)} / 4 · {domainScores.length} q
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {domainScores.map(({ qId, score }) => {
                          const q = MAIN_QUESTIONS_BY_ID.get(qId);
                          const tone =
                            score < 0 ? 'bg-gray-100 text-gray-400' :
                            score >= 3 ? 'bg-green-50 text-green-700 border border-green-200' :
                            score === 2 ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                            'bg-red-50 text-red-700 border border-red-200';
                          return (
                            <div key={qId} className={`p-2 rounded-lg ${tone}`} title={q?.text.en || ''}>
                              <p className="text-[9px] font-mono font-bold opacity-80">{qId}</p>
                              <p className="text-sm font-black">
                                {score === -1 ? 'N/A' : score < 0 ? '—' : score}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Critical Risk */}
            {bwm?.triggeredRiskQuestions?.length > 0 && (
              <Section title="Triggered Critical-Risk Questions" icon="fa-triangle-exclamation">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
                  {bwm.triggeredRiskQuestions.map((qId: string) => {
                    const q = MAIN_QUESTIONS_BY_ID.get(qId);
                    return (
                      <div key={qId} className="flex items-start gap-2 text-sm">
                        <i className="fa-solid fa-circle-exclamation text-red-500 mt-1"></i>
                        <div>
                          <span className="font-mono text-xs font-black text-red-700">{qId}</span>
                          <span className="text-gray-700 ml-2">{q?.text.en || ''}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* Evidence Images */}
            {evidenceImages.length > 0 && (
              <Section title={`Evidence Images (${evidenceImages.length})`} icon="fa-images">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {evidenceImages.map((src, i) => (
                    <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="block aspect-square rounded-xl overflow-hidden border border-gray-200 hover:border-indigo-400 transition-colors">
                      <img src={src} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                    </a>
                  ))}
                </div>
              </Section>
            )}

            {/* Signature */}
            {signature && (
              <Section title="Signature" icon="fa-signature">
                <div className="bg-white border border-gray-200 rounded-xl p-4 inline-block">
                  <img src={signature} alt="Signature" className="max-h-40" />
                </div>
              </Section>
            )}

            {/* Metadata */}
            {Object.keys(metadata).length > 0 && (
              <Section title="Submission Metadata" icon="fa-circle-info">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {Object.entries(metadata).map(([k, v]) => (
                    <div key={k} className="bg-white p-2 rounded-lg border border-gray-100">
                      <span className="font-black text-gray-400">{k}: </span>
                      <span className="text-gray-700 break-all">{String(v)}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
