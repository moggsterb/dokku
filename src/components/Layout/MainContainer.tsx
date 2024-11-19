'use client';

import { ReactNode } from 'react';

import styles from './MainContainer.module.scss';

interface Props {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const MainContainer = ({ children }: Props) => {
  return (
    <div className={`${styles.wrapper}`}>
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default MainContainer;
