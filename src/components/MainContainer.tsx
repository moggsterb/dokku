import { ReactNode } from 'react';

import styles from './MainContainer.module.scss';

interface Props {
  header: ReactNode;
  children: ReactNode;
}

const MainContainer = ({ header, children }: Props) => {
  return (
    <div className={styles.wrapper}>
      {header && <header className={styles.header}>{header}</header>}
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default MainContainer;
