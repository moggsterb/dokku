import type { Metadata } from 'next';

import './globals.scss';

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
      </body>
    </html>
  );
}
