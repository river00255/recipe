import { ReactNode } from 'react';
import AuthProvider from '../_components/AuthProvider';

const RecipeLayout = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default RecipeLayout;
