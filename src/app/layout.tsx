import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './reset.css';
import './globals.css';
import SideAppBar from './_components/SideAppBar';
import QueryProvider from '@/lib/QueryProvider';
import AuthProvider from './_components/AuthProvider';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
});

export const metadata: Metadata = {
  title: 'Recipe',
  description: 'Find and share everyday cooking inspiration on Allrecipes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.className}>
      <body>
        <AuthProvider>
          <QueryProvider>
            <div className="container">
              <SideAppBar />
              <div className="pages">{children}</div>
            </div>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
