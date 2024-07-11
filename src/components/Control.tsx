'use client';

import { ReactNode } from 'react';
import styles from './Control.module.scss';
import { useRouter } from 'next/navigation';

type ControlAction = { title: string; url: string };

interface Props {
  title: string;
  description: string;
  beforeActions?: ControlAction[];
  afterActions?: ControlAction[];
}

const Control = ({
  title,
  description,
  beforeActions = [],
  afterActions = [],
}: Props) => {
  const router = useRouter();

  const navHandler = (url: string) => {
    router.push(url);
  };

  const renderButtons = (actions: ControlAction[]) => {
    return actions.map(({ url, title }, index) => {
      return (
        <button key={index} onClick={() => navHandler(url)}>
          {title}
        </button>
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.before}>{renderButtons(beforeActions)}</div>
      <div className={styles.center}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className={styles.after}>{renderButtons(afterActions)}</div>
    </div>
  );
};

export default Control;
