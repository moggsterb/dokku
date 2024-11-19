import React from 'react';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import PortalSection from '@/components/Layout/PortalSection';

import '@/app/globals.scss';
import styles from './RootLayout.module.scss';

export const metadata: Metadata = {
  title: 'Dokku',
  description: 'Sudoku play and solve',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem={false} defaultTheme='dark'>
          <div className='content'>
            <Header />
            <main className='main'>
              {children}
              <PortalSection id='portHeader' className={styles.portHeader} />
              <PortalSection id='portFooter' className={styles.portFooter} />
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
