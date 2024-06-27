'use client';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import Snackbar from '../Snackbar';
import { usePathname } from 'next/navigation';
import usePageMarker from '@/app/_hooks/usePageMarker';

export type SnackbarState = {
  message: string | null;
  show: (message: string) => void;
  close: () => void;
};

const SnackbarContext = createContext<SnackbarState>({
  message: null,
  show: () => {},
  close: () => {},
});

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const pathname = usePathname();
  const { resetPageMarker } = usePageMarker();

  const show = (text: string) => setMessage(text);

  const close = () => setMessage(null);

  useEffect(() => {
    if (!pathname.includes('recipe')) {
      resetPageMarker();
    } else {
      pathname.includes('recommend') && resetPageMarker();
    }
  }, [pathname]);

  return (
    <SnackbarContext.Provider value={{ message, show, close }}>
      {children}
      {message && <Snackbar message={message} show={show} close={close} />}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;

export const useSnackbar = () => useContext(SnackbarContext);
