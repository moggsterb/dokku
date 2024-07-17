'use client';

import { useState } from 'react';
import styles from './Header.module.scss';
import { LEVELS } from '@/utils/examples';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [{ title: 'DOKKU', url: '/' }, ...LEVELS];

  const router = useRouter();

  const navHandler = (url: string) => {
    router.push(url);
    setMenuOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${menuOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.row}>
        <Link href='/' className={styles.title}>
          DOKKU
        </Link>

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
    </header>
  );
};

export default Header;
