import { ReactNode } from 'react';

import styles from './MainContainer.module.scss';

interface Props {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const MainContainer = ({ header, footer, children }: Props) => {
  return (
    <div className={styles.wrapper}>
      {header && <header className={styles.header}>{header}</header>}
      <main className={styles.content}>{children}</main>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
};

export default MainContainer;
