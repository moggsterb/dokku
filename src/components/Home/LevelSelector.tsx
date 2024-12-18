import Link from 'next/link';

import AnimReveal from '../Layout/AnimReveal';

import { LEVELS } from '@/data/examples';
import styles from './LevelSelector.module.scss';

const LevelSelector = () => {
  return (
    <div className={styles.levels}>
      <AnimReveal
        items={LEVELS.map(({ title, url, initX, marginTop, style = 'std' }) => {
          return {
            initX,
            initOpacity: 0,
            component: (
              <Link
                href={url}
                style={{ marginTop }}
                className={styles[style]}
                prefetch={false}
              >
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
