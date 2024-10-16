import type { Metadata } from 'next';

import './globals.scss';
import styles from './Layout.module.scss';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { ThemeProvider } from 'next-themes';
import React from 'react';

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
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem={false} defaultTheme='dark'>
          <>
            <div className='content'>
              <Header />
              <main className='main'>
                {children}

                <div className={styles.gridHeader}>
                  <div id='gHeader' />
                </div>

                <div className={styles.gridFooter}>
                  <div id='gFooter' />
                </div>
              </main>
            </div>
            <Footer />
          </>
        </ThemeProvider>
      </body>
    </html>
  );
}
