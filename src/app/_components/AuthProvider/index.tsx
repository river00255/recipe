'use client';
import { auth } from '@/lib/firebase';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useSnackbar } from '../SnackbarProvider';

type AuthState = {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState>({ user: null, login: () => {}, logout: () => {} });

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);

  const router = useRouter();
  const { show } = useSnackbar();

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
        router.push('/');
        show('로그인.');
      })
      .catch((error) => show(error.message));
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        router.replace('/');
      })
      .catch((error) => show(error.message));
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
