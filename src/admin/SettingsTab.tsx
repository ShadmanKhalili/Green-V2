import React from 'react';
import { useAuth } from '../../AuthContext';
import firebaseConfig from '../../firebase-applet-config.json';
import { MAIN_QUESTIONS, DOMAINS } from '../../questionBank';
import { PROBING_QUESTIONS } from '../../constants';
import { SUPER_ADMIN_EMAIL } from './constants';

interface Props {
  totalAssessments: number;
  totalUsers: number;
}

const InfoRow: React.FC<{ label: string; value: React.ReactNode; copy?: boolean }> = ({ label, value, copy }) => {
  const handleCopy = () => {
    if (typeof value === 'string') {
      navigator.clipboard.writeText(value);
    }
  };
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
      <p className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-sm font-bold text-gray-900 font-mono break-all text-right">{value}</p>
        {copy && typeof value === 'string' && (
          <button onClick={handleCopy} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center" title="Copy">
            <i className="fa-solid fa-copy text-[10px]"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export const SettingsTab: React.FC<Props> = ({ totalAssessments, totalUsers }) => {
  const { currentUser, userProfile, logout } = useAuth();
  const isSuperAdmin = currentUser?.email === SUPER_ADMIN_EMAIL;
  const projectId = (firebaseConfig as any).projectId;
  const consoleUrl = `https://console.firebase.google.com/project/${projectId}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Identity */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <div>
            <h3 className="font-black text-gray-900 text-lg tracking-tight">Identity</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Currently signed in</p>
          </div>
        </div>
        <InfoRow label="Email" value={currentUser?.email || '—'} copy />
        <InfoRow label="Display name" value={userProfile?.name || currentUser?.displayName || '—'} />
        <InfoRow label="UID" value={currentUser?.uid || '—'} copy />
        <InfoRow label="Role" value={
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            userProfile?.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'
          }`}>{userProfile?.role || '—'}</span>
        } />
        <InfoRow label="Super admin" value={
          isSuperAdmin
            ? <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-100 text-purple-700">Yes</span>
            : <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500">No</span>
        } />
        <InfoRow label="Email verified" value={
          currentUser?.emailVerified
            ? <span className="text-green-600 font-black">✓ Yes</span>
            : <span className="text-red-600 font-black">✗ No</span>
        } />

        <button
          onClick={() => logout()}
          className="mt-5 w-full px-4 py-3 bg-gray-100 hover:bg-red-50 hover:text-red-700 text-gray-700 rounded-xl text-sm font-black uppercase tracking-widest transition-colors"
        >
          <i className="fa-solid fa-right-from-bracket mr-2"></i> Sign Out
        </button>
      </div>

      {/* System Info */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-server"></i>
          </div>
          <div>
            <h3 className="font-black text-gray-900 text-lg tracking-tight">System Info</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Firebase project</p>
          </div>
        </div>
        <InfoRow label="Project ID" value={projectId} copy />
        <InfoRow label="Auth domain" value={(firebaseConfig as any).authDomain} copy />
        <InfoRow label="Firestore DB" value={(firebaseConfig as any).firestoreDatabaseId} copy />
        <InfoRow label="Storage bucket" value={(firebaseConfig as any).storageBucket} copy />
        <InfoRow label="Total assessments" value={totalAssessments} />
        <InfoRow label="Total users" value={totalUsers} />
        <InfoRow label="Question bank size" value={`${MAIN_QUESTIONS.length} main / ${PROBING_QUESTIONS.length} probing / ${DOMAINS.length} domains`} />

        <a
          href={consoleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 w-full inline-flex items-center justify-center px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-black uppercase tracking-widest transition-colors"
        >
          <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i> Open Firebase Console
        </a>
      </div>

      {/* Super-admin docs */}
      <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-slate-900 p-8 rounded-3xl text-white shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl border border-white/10">
            <i className="fa-solid fa-key text-amber-300"></i>
          </div>
          <div>
            <h3 className="font-black text-white text-2xl tracking-tight">Super Admin Access</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300/70 mt-1">Bootstrap and emergency recovery</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-300 mb-2">Super admin email</p>
            <p className="text-lg font-bold font-mono break-all">{SUPER_ADMIN_EMAIL}</p>
            <p className="text-xs text-indigo-200/60 mt-3 leading-relaxed">
              Hardcoded in <span className="font-mono">firestore.rules</span> and <span className="font-mono">AuthContext.tsx</span>.
              When this account signs in <strong>and verifies its email</strong>, it automatically receives super-admin
              privileges, regardless of the <span className="font-mono">userProfiles</span> document.
            </p>
          </div>

          <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-300 mb-2">First-time setup</p>
            <ol className="text-sm space-y-2 list-decimal list-inside text-indigo-50">
              <li>Sign out and click "Register" on the auth screen.</li>
              <li>Enter the super-admin email + your chosen password.</li>
              <li>Verify the address from the email Firebase sends.</li>
              <li>Sign in again — admin tabs will appear.</li>
            </ol>
            <p className="text-xs text-indigo-200/60 mt-3">
              Firebase Auth requires the user to register through the UI; passwords cannot be seeded from client code.
            </p>
          </div>

          <div className="md:col-span-2 bg-amber-500/10 p-5 rounded-2xl border border-amber-500/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-300 mb-2">
              <i className="fa-solid fa-circle-info mr-1"></i> Promoting other admins
            </p>
            <p className="text-sm text-indigo-50 leading-relaxed">
              Use the <span className="font-bold">Users</span> tab to grant or revoke admin access on existing accounts.
              Promoted admins can manage submissions and users but cannot revoke the super admin or change firestore.rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
