'use client';

import { ReactNode, useContext } from 'react';

import styles from './MainContainer.module.scss';
import { useTheme } from 'next-themes';

interface Props {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const MainContainer = ({ header, footer, children }: Props) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className={`${styles.wrapper}`}>
      {header && <header className={styles.header}>{header}</header>}
      <main className={styles.content}>{children}</main>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
};

export default MainContainer;
