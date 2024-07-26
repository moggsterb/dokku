import type { Metadata } from 'next';

import './globals.scss';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeContext';

export const metadata: Metadata = {
  title: 'Dokku',
  description: 'Sudoku play and solve',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider>
          <>
            <div className='content'>
              <Header />
              <main className='main'>{children}</main>
            </div>

            <Footer />
          </>
        </ThemeProvider>
      </body>
    </html>
  );
}
