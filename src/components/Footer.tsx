import { LEVELS } from '@/utils/examples';
import Link from 'next/link';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <Link href={'/'} className={styles.title}>
          Dokku
        </Link>
      </div>
      <div>
        {LEVELS.map(({ url, title }, index) => {
          return (
            <Link href={url} className={styles.item}>
              {title}
            </Link>
          );
        })}
      </div>
      <div>&copy; MB 2024</div>
    </footer>
  );
};

export default Footer;
