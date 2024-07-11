import type { Metadata } from 'next';

import './globals.scss';
import Footer from '@/components/Footer';

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
        <main className='main'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
