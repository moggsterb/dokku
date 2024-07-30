'use client';

import { DOKKU } from '@/utils/dokku';

import styles from './Dokku.module.scss';
import { ThemeContext } from './ThemeContext';
import { useContext, useEffect, useState } from 'react';

const Dokku = () => {
  const { theme } = useContext(ThemeContext);

  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (!anim) {
      setAnim(true);
    }
  }, [anim]);

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
    const pixelClass = `${pixel === '0' && anim ? styles.on : styles.off} ${
      p === 2 || p === 5 ? styles.hGutter : ''
    }`;

    const style = anim ? { animationDelay: `${Math.random() * 20}s` } : {};
    return <div key={p} className={pixelClass} style={style} />;
  };

  return (
    <div className={`${styles.dokku} ${styles[theme]}`}>
      {DOKKU.map((row, r) => renderRow(row, r))}
    </div>
  );
};

export default Dokku;
