import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, memoryLocalCache } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const rawDbId = (firebaseConfig as any).firestoreDatabaseId as string | undefined;
const namedDbId = rawDbId && rawDbId !== '' && rawDbId !== '(default)' ? rawDbId : undefined;

const initFirestore = (settings: Parameters<typeof initializeFirestore>[1]) =>
  namedDbId
    ? initializeFirestore(app, settings, namedDbId)
    : initializeFirestore(app, settings);

let db;
try {
  db = initFirestore({
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  });
} catch (err) {
  console.warn('Firestore persistent cache unavailable, falling back to memory cache:', err);
  db = initFirestore({ localCache: memoryLocalCache() });
}
export { db };

export const googleProvider = new GoogleAuthProvider();
