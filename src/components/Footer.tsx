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
            <div className={styles.menuItem}>
              <button
                key={index}
                onClick={() => navHandler(url)}
                className={styles.item}
              >
                {title}
              </button>
            </div>
          );
        })}
      </div>
    </footer>
  );

  // : (
  //   <footer className={styles.footer}>
  //     <div className={styles.title}>
  //       <Link href={'/'} className={styles.title}>
  //         Dokku
  //       </Link>
  //     </div>

  //     <div className={styles.levels}>
  //       {LEVELS.map(({ url, title }, index) => {
  //         return (
  //           <Link key={index} href={url} className={styles.item}>
  //             {title}
  //           </Link>
  //         );
  //       })}
  //     </div>
  //     <div className={styles.copy}>&copy; MB 2024</div>
  //   </footer>
  // );
};

export default Footer;
