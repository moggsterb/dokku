'use client';

import { useContext } from 'react';
import styles from './Footer.module.scss';
import { ThemeContext } from './ThemeContext';

const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <footer className={`${styles.footer} ${styles[theme]}`}>
      <div className={styles.copy}>
        &copy; MB 2024
        <button className={styles.theme} onClick={toggleTheme}>
          Theme: {theme}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
