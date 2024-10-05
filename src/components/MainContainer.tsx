'use client';

import { ReactNode, useContext } from 'react';

import styles from './MainContainer.module.scss';
import { useTheme } from 'next-themes';

interface Props {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const MainContainer = ({ children }: Props) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className={`${styles.wrapper}`}>
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default MainContainer;
