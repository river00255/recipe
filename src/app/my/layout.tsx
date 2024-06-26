import { ReactNode } from 'react';
import AuthProvider from '../_components/AuthProvider';

const MyPageLayout = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default MyPageLayout;
