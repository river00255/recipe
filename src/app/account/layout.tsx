import { ReactNode } from 'react';
import AuthProvider from '../_components/AuthProvider';

const AccountLayout = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AccountLayout;
