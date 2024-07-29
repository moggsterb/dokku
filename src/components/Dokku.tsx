import { DOKKU } from '@/utils/dokku';

import styles from './Dokku.module.scss';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';

const Dokku = () => {
  const { theme } = useContext(ThemeContext);

  const renderRow = (row: string[], r: number) => {
    return (
      <div
        key={r}
        className={`${styles.row} ${r === 2 || r === 5 ? styles.vGutter : ''}`}
      >
        {row.map((block, b) => renderBlock(r, block, b))}
      </div>
    );
  };

  const renderBlock = (r: number, block: string, b: number) => {
    return (
      <div key={b} className={styles.block}>
        {block.split('').map((pixel, p) => renderPixel(r, pixel, p))}
      </div>
    );
  };

  const renderPixel = (r: number, pixel: string, p: number) => {
    const pixelClass = `${pixel === '0' ? styles.on : styles.off} ${
      p === 2 || p === 5 ? styles.hGutter : ''
    }`;
    return (
      <div
        key={p}
        className={pixelClass}
        style={{
          // animationDelay: `${Math.random() * 1.5 + r * 1}s`,
          animationDelay: `${Math.random() * 20}s`,
        }}
      />
    );
  };

  return (
    <div className={`${styles.dokku} ${styles[theme]}`}>
      {DOKKU.map((row, r) => renderRow(row, r))}
    </div>
  );
};

export default Dokku;
