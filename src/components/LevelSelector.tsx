import { LEVELS } from '@/utils/examples';
import AnimReveal from './AnimReveal';
import styles from './LevelSelector.module.scss';
import Link from 'next/link';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';

const LevelSelector = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.levels} ${styles[theme]}`}>
      <AnimReveal
        items={LEVELS.map(({ title, url, initX, marginTop, style = 'std' }) => {
          return {
            initX,
            initOpacity: 0,
            component: (
              <Link href={url} style={{ marginTop }} className={styles[style]}>
                <div>{title}</div>
                <span>{title}</span>
              </Link>
            ),
          };
        })}
      />
    </div>
  );
};

export default LevelSelector;
