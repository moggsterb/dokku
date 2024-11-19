'use client';

import { useCallback, useEffect, useState } from 'react';
import { DOKKU } from '@/utils/dokku';

import styles from './Dokku.module.scss';

const Dokku = () => {
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (!anim) {
      setAnim(true);
    }
  }, [anim]);

  const generateAnimationDelay = useCallback(() => {
    return { animationDelay: `${Math.random() * 20}s` };
  }, []);

  const renderPixel = useCallback(
    (r: number, pixel: string, p: number) => {
      const pixelClass = `${pixel === '0' && anim ? styles.on : styles.off} ${
        p === 2 || p === 5 ? styles.hGutter : ''
      }`;

      const style = anim ? generateAnimationDelay() : {};
      return <div key={p} className={pixelClass} style={style} />;
    },
    [anim, generateAnimationDelay]
  );

  const renderBlock = useCallback(
    (r: number, block: string, b: number) => {
      return (
        <div key={b} className={styles.block}>
          {block.split('').map((pixel, p) => renderPixel(r, pixel, p))}
        </div>
      );
    },
    [renderPixel]
  );

  const renderRow = useCallback(
    (row: string[], r: number) => {
      return (
        <div
          key={r}
          className={`${styles.row} ${
            r === 2 || r === 5 ? styles.vGutter : ''
          }`}
        >
          {row.map((block, b) => renderBlock(r, block, b))}
        </div>
      );
    },
    [renderBlock]
  );

  return (
    <div className={styles.dokku}>
      {DOKKU.map((row, r) => renderRow(row, r))}
    </div>
  );
};

export default Dokku;
