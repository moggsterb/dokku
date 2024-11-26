'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { LEVELS } from '@/data/examples';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean | undefined>();

  const navItems = [
    { title: 'DOKKU', url: '/' },
    ...LEVELS,
    { title: 'How Dokku Solves Puzzles', url: '/method' },
    { title: 'About the Dokku Project', url: '/coding' },
  ];

  const router = useRouter();

  useEffect(() => {
    if (menuOpen === undefined) {
      setMenuOpen(false);
    }
  }, [menuOpen]);

  const navHandler = (url: string) => {
    router.push(url);
    setMenuOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${menuOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.row}>
        <Link href='/' className={styles.title} prefetch={false}>
          DOKKU
        </Link>

        {menuOpen !== undefined && (
          <button
            className={styles.menuButton}
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <FontAwesomeIcon icon={menuOpen ? faX : faBars} />
          </button>
        )}
      </div>

      {menuOpen !== undefined && (
        <div
          className={styles.menuItems}
          style={{ marginTop: menuOpen ? 0 : navItems.length * -50 }}
        >
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
      )}
    </header>
  );
};

export default Header;
