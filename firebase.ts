import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, memoryLocalCache } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Enable Firestore offline persistence so writes queue while offline and sync on reconnect.
// Falls back to in-memory cache if IndexedDB is unavailable (e.g. private browsing on iOS).
let db;
try {
  db = initializeFirestore(
    app,
    {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    },
    firebaseConfig.firestoreDatabaseId
  );
} catch (err) {
  // IndexedDB blocked or quota exhausted — fall back to memory cache
  console.warn('Firestore persistent cache unavailable, falling back to memory cache:', err);
  db = initializeFirestore(
    app,
    { localCache: memoryLocalCache() },
    firebaseConfig.firestoreDatabaseId
  );
}
export { db };

export const googleProvider = new GoogleAuthProvider();
