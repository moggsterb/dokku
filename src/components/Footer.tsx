import { LEVELS } from '@/utils/examples';
import Link from 'next/link';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.title}>
        <Link href={'/'} className={styles.title}>
          Dokku
        </Link>
      </div>

      <div className={styles.levels}>
        {LEVELS.map(({ url, title }, index) => {
          return (
            <Link key={index} href={url} className={styles.item}>
              {title}
            </Link>
          );
        })}
      </div>
      <div className={styles.copy}>&copy; MB 2024</div>
    </footer>
  );
};

export default Footer;
