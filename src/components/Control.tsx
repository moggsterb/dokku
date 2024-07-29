'use client';

import { ReactNode } from 'react';
import styles from './Control.module.scss';
import { useRouter } from 'next/navigation';

type ControlAction = {
  title: string;
  url?: string;
  handler?: () => void;
  style?: string;
};

interface Props {
  banner?: { title: string; description: string };
  beforeActions?: ControlAction[];
  afterActions?: ControlAction[];
}

const Control = ({ banner, beforeActions = [], afterActions = [] }: Props) => {
  const router = useRouter();

  const navHandler = (url: string) => {
    router.push(url);
  };

  const renderButtons = (actions: ControlAction[]) => {
    return actions.map(({ url, title, handler, style }, index) => {
      return (
        <button
          key={index}
          onClick={() => {
            if (url) {
              navHandler(url);
            } else if (handler) {
              handler();
            }
          }}
          className={`${style && styles[style]}`}
        >
          {title}
        </button>
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      {beforeActions.length > 0 && (
        <div className={styles.before}>{renderButtons(beforeActions)}</div>
      )}
      {banner && (
        <div className={styles.banner}>
          <h1>{banner.title}</h1>
          <p>{banner.description}</p>
        </div>
      )}

      {afterActions.length > 0 && (
        <div className={styles.after}>{renderButtons(afterActions)}</div>
      )}
    </div>
  );
};

export default Control;
