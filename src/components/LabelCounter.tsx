import { buildStyle } from '@/utils/helpers';
import styles from './LabelCounter.module.scss';

interface Props {
  text: string;
  count: number;
  theme?: 'standard' | 'scanning' | 'single';
  enterHandler?: (state: boolean) => void;
  clickHandler?: () => void;
}

const LabelCounter = ({
  text,
  count,
  theme = 'standard',
  enterHandler,
  clickHandler,
}: Props) => {
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
        if (!enterHandler) return;
        enterHandler(true);
      }}
      onMouseLeave={() => {
        if (!enterHandler) return;
        enterHandler(false);
      }}
      onClick={() => {
        if (!clickHandler) return;
        clickHandler();
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
