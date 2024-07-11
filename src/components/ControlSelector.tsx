'use client';

import { ReactNode } from 'react';
import styles from './Control.module.scss';

interface Props {
  title: string;
  description: string;
}

const ControlSelector = ({ title, description }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.center}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ControlSelector;
