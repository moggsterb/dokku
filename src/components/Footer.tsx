'use client';

import { LEVELS } from '@/utils/examples';
import styles from './Footer.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [{ title: 'DOKKU', url: '/' }, ...LEVELS];

  const router = useRouter();

  const navHandler = (url: string) => {
    router.push(url);
    setMenuOpen(false);
  };

  return (
    <footer
      className={`${styles.footer} ${menuOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.row}>
        <div className={styles.copy}>&copy; MB 2024</div>

        <button
          className={styles.menuButton}
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <FontAwesomeIcon icon={menuOpen ? faX : faBars} />
        </button>
      </div>

      <div className={styles.menuItems}>
        {navItems.map(({ url, title }, index) => {
          return (
            <div key={index} className={styles.menuItem}>
              <button onClick={() => navHandler(url)} className={styles.item}>
                {title}
              </button>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
