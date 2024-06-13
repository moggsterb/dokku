import { buildStyle } from '@/utils/helpers';
import styles from './LabelCounter.module.scss';

interface Props {
  text: string;
  count: number;
  theme?: 'standard' | 'scanning' | 'single';
  handler?: any;
}

const LabelCounter = ({ text, count, theme = 'standard', handler }: Props) => {
  const wrapperStyle = () => {
    return buildStyle([
      { style: styles.wrapper, condition: true },
      { style: styles.scanning, condition: theme === 'scanning' },
      { style: styles.single, condition: theme === 'single' },
    ]);
  };

  return (
    <div
      className={wrapperStyle()}
      onMouseEnter={() => {
        if (!handler) return;
        handler(true);
      }}
      onMouseLeave={() => {
        if (!handler) return;
        handler(false);
      }}
    >
      <div className={styles.label}>{text}</div>
      <div className={styles.countHolder}>
        <div className={styles.count}>{count}</div>
      </div>
    </div>
  );
};

export default LabelCounter;
