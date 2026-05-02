import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, db } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface UserProfile {
  email: string;
  role: 'enumerator' | 'admin';
  name?: string;
  createdAt?: any;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const profileDoc = await getDoc(doc(db, 'userProfiles', user.uid));
          if (profileDoc.exists()) {
            setUserProfile(profileDoc.data() as UserProfile);
          } else {
            // Create default enumerator profile
            const isSuperAdmin = user.email === 'sadmankhalili@gmail.com';
            const newProfile: UserProfile = {
              email: user.email || '',
              role: isSuperAdmin ? 'admin' : 'enumerator',
              name: user.displayName || '',
            };
            await setDoc(doc(db, 'userProfiles', user.uid), {
              ...newProfile,
              createdAt: serverTimestamp(),
            });
            setUserProfile(newProfile);
          }
        } catch (error: any) {
          console.error("Error fetching/creating user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      if (error.code === 'auth/unauthorized-domain') {
        alert("Domain Not Authorized: Please add this domain to your Firebase Console under Authentication -> Settings -> Authorized domains.");
      } else {
        alert(`Sign in failed: ${error.message}`);
      }
      throw error;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      console.error("Error signing in with email", error);
      if (error.code === 'auth/operation-not-allowed') {
        throw new Error("Email/Password Sign-In is not enabled. Please enable it in Firebase Console -> Authentication -> Sign-in method.");
      }
      throw error;
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCredential.user, { displayName: name });
    } catch (error: any) {
      console.error("Error registering with email", error);
      if (error.code === 'auth/operation-not-allowed') {
         throw new Error("Email/Password Sign-In is not enabled. Please enable it in Firebase Console -> Authentication -> Sign-in method.");
      }
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error sending password reset", error);
      throw error;
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    signInWithGoogle,
    signInWithEmail,
    registerWithEmail,
    resetPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
