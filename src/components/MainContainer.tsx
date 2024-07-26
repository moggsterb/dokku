'use client';

import { ReactNode, useContext } from 'react';

import styles from './MainContainer.module.scss';
import { ThemeContext } from './ThemeContext';

interface Props {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const MainContainer = ({ header, footer, children }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${styles.wrapper} ${styles[theme]}`}>
      {header && <header className={styles.header}>{header}</header>}
      <main className={styles.content}>{children}</main>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
};

export default MainContainer;
