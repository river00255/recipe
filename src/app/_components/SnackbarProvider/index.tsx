'use client';
import { ReactNode, createContext, useContext, useState } from 'react';
import Snackbar from '../Snackbar';

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

  const show = (text: string) => setMessage(text);

  const close = () => setMessage(null);

  return (
    <SnackbarContext.Provider value={{ message, show, close }}>
      {children}
      {message && <Snackbar message={message} show={show} close={close} />}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;

export const useSnackbar = () => useContext(SnackbarContext);
