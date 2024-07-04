'use client';

import styles from './Control.module.scss';

interface Props {
  title: string;
}

const ControlSelector = ({ title }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h1>{title}</h1>
    </div>
  );
};

export default ControlSelector;
