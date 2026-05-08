import React, { useMemo, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { db } from '../../firebase';
import { useAuth, UserRole } from '../../AuthContext';
import { tsToDate } from './constants';

export interface UserDoc {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  createdAt?: any;
}

interface Props {
  assessments: any[];
  users: UserDoc[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onRoleChanged: (id: string, role: UserRole) => void;
}

export const UsersTab: React.FC<Props> = ({ assessments, users, loading, error: parentError, onRefresh, onRoleChanged }) => {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | UserRole>('all');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const displayError = error || parentError;

  const submissionCountBy = useMemo(() => {
    const m: Record<string, number> = {};
    assessments.forEach(a => {
      const id = a.enumeratorId;
      if (!id) return;
      m[id] = (m[id] || 0) + 1;
    });
    return m;
  }, [assessments]);

  const filtered = useMemo(() => {
    let list = users;
    if (search) {
      const t = search.toLowerCase();
      list = list.filter(u =>
        u.email.toLowerCase().includes(t) ||
        (u.name?.toLowerCase().includes(t)) ||
        u.id.toLowerCase().includes(t)
      );
    }
    if (filterRole !== 'all') {
      list = list.filter(u => u.role === filterRole);
    }
    return list.sort((a, b) => {
      if (a.role !== b.role) return a.role === 'admin' ? -1 : 1;
      return a.email.localeCompare(b.email);
    });
  }, [users, search, filterRole]);

  const setRole = async (user: UserDoc, role: 'admin' | 'enumerator') => {
    if (busyId) return;
    if (user.id === currentUser?.uid && role === 'enumerator') {
      if (!confirm('You are about to demote yourself. You may lose access to this panel. Continue?')) return;
    }
    setBusyId(user.id);
    setError(null);
    try {
      const update: any = { role };
      if (user.name) update.name = user.name;
      await updateDoc(doc(db, 'userProfiles', user.id), update);
      onRoleChanged(user.id, role);
    } catch (err: any) {
      console.error('Failed to update user role:', err);
      setError(err.message || 'Failed to update role');
    } finally {
      setBusyId(null);
    }
  };

  const adminCount = users.filter(u => u.role === 'admin').length;
  const enumCount = users.filter(u => u.role === 'enumerator').length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-users"></i>
            </div>
            <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full uppercase">Total</span>
          </div>
          <p className="text-3xl font-black text-gray-900 mt-3">{users.length}</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Registered users</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-user-shield"></i>
            </div>
            <span className="text-[9px] font-black text-purple-600 bg-purple-50 px-2 py-1 rounded-full uppercase">Privileged</span>
          </div>
          <p className="text-3xl font-black text-gray-900 mt-3">{adminCount}</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Admins</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-clipboard-user"></i>
            </div>
            <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase">Field</span>
          </div>
          <p className="text-3xl font-black text-gray-900 mt-3">{enumCount}</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Enumerators</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-grow">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by email, name, or UID..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
          {(['all', 'admin', 'enumerator'] as const).map(r => (
            <button
              key={r}
              onClick={() => setFilterRole(r)}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                filterRole === r ? 'bg-white shadow text-indigo-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-black uppercase tracking-widest transition-colors disabled:opacity-50"
        >
          <i className={`fa-solid fa-arrows-rotate ${loading ? 'animate-spin' : ''}`}></i>
        </button>
      </div>

      {displayError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          {displayError}
        </div>
      )}

      {/* Users table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400">User</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100">Role</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100">Submissions</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100">Joined</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => {
                const isMe = u.id === currentUser?.uid;
                const subs = submissionCountBy[u.id] || 0;
                const created = u.createdAt ? tsToDate(u.createdAt) : null;
                return (
                  <tr key={u.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm ${
                          u.role === 'admin' ? 'bg-indigo-600' : 'bg-green-600'
                        }`}>
                          {(u.name || u.email || '?').charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate flex items-center gap-2">
                            {u.name || u.email}
                            {isMe && <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">You</span>}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{u.email}</p>
                          <p className="text-[10px] font-mono text-gray-300 truncate">{u.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 border-l border-gray-50">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 border-l border-gray-50">
                      <span className="text-sm font-black text-gray-900">{subs}</span>
                    </td>
                    <td className="p-4 border-l border-gray-50 text-xs text-gray-500">
                      {created ? format(created, 'MMM dd, yyyy') : '—'}
                    </td>
                    <td className="p-4 border-l border-gray-50 text-right">
                      {u.role === 'enumerator' ? (
                        <button
                          onClick={() => setRole(u, 'admin')}
                          disabled={busyId === u.id}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors disabled:opacity-50"
                        >
                          {busyId === u.id ? <i className="fa-solid fa-spinner animate-spin"></i> : <><i className="fa-solid fa-arrow-up mr-1"></i>Promote</>}
                        </button>
                      ) : (
                        <button
                          onClick={() => setRole(u, 'enumerator')}
                          disabled={busyId === u.id}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors disabled:opacity-50"
                        >
                          {busyId === u.id ? <i className="fa-solid fa-spinner animate-spin"></i> : <><i className="fa-solid fa-arrow-down mr-1"></i>Demote</>}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="py-16 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Loading users...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center text-gray-400 mb-3">
              <i className="fa-solid fa-user-slash text-xl"></i>
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No users match the current filter</p>
          </div>
        )}
      </div>
    </div>
  );
};
