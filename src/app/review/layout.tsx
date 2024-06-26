import { ReactNode } from 'react';
import AuthProvider from '../_components/AuthProvider';

const ReviewLayout = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ReviewLayout;
