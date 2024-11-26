'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import styles from './Footer.module.scss';
import Link from 'next/link';

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.copy}>
        &copy; MB 2024{' '}
        <Link href='/coding' className='link' prefetch={false}>
          About Dokku
        </Link>
      </div>
      {mounted && (
        <button
          className={styles.theme}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          Theme: {theme}
        </button>
      )}
    </footer>
  );
};

export default Footer;
