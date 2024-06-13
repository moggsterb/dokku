import { ReactNode } from 'react';

import styles from './MainContainer.module.scss';

interface Props {
  header: ReactNode;
  children: ReactNode;
}

const MainContainer = ({ header, children }: Props) => {
  return (
    <div>
      {header && <header className={styles.header}>{header}</header>}
      {children}
    </div>
  );
};

export default MainContainer;
