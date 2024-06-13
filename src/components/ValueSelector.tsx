import styles from './ValueSelector.module.scss';

interface Props {
  taken: number[];
  setCellValue: (value: number | string) => void;
}

const ValueSelector = ({ taken, setCellValue }: Props) => {
  const handleClick = (value: number | string) => {
    setCellValue(value);
  };

  const renderItem = (value: number | string) => {
    const isTaken = typeof value === 'number' && taken.includes(value);
    const valueStyle = `${styles.value} ${
      isTaken ? styles.taken : typeof value === 'number' ? styles.available : ''
    }`;

    return (
      <div
        key={value}
        className={valueStyle}
        onClick={() => {
          if (!isTaken) handleClick(value);
        }}
      >
        {value}
      </div>
    );
  };

  return (
    <div className={styles.selector}>
      <div className={styles.row}>
        {[1, 2, 3, 4, 5].map((value) => {
          return renderItem(value);
        })}
      </div>
      <div className={styles.row}>
        {[6, 7, 8, 9, 'CLEAR'].map((value) => {
          return renderItem(value);
        })}
      </div>
    </div>
  );
};

export default ValueSelector;
