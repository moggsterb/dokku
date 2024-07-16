import { LEVELS } from '@/utils/examples';
import AnimReveal from './AnimReveal';
import styles from './LevelSelector.module.scss';
import Link from 'next/link';

const LevelSelector = () => {
  return (
    <div className={styles.levels}>
      <AnimReveal
        items={LEVELS.map(({ title, url, initX, marginTop }) => {
          return {
            initX,
            initOpacity: 0,
            component: (
              <Link href={url} style={{ marginTop }}>
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
