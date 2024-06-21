'use client';
import { auth } from '@/lib/firebase';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type AuthState = {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState>({ user: null, login: () => {}, logout: () => {} });

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);

  const router = useRouter();

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
        router.push('/');
      })
      .catch((error) => error);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        router.replace('/');
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    if (!currentUser) {
      onAuthStateChanged(auth, (user) => {
        user ? setCurrentUser(user) : setCurrentUser(null);
      });
    }
  }, [currentUser]);

  return <AuthContext.Provider value={{ user: currentUser, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
