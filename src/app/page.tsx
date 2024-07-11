'use client';

import MainContainer from '@/components/MainContainer';
import Link from 'next/link';

import styles from './page.module.scss';
import AnimReveal from '@/components/AnimReveal';
import { LEVELS } from '@/utils/examples';

export default function Home() {
  const header = <h1 className={styles.header}>Dokku</h1>;

  return (
    <MainContainer header={header}>
      <div className={styles.levels}>
        <AnimReveal
          items={LEVELS.map(({ title, url, initX, marginTop }) => {
            return {
              initX,
              initOpacity: 0,
              component: (
                <Link href={url} style={{ marginTop }}>
                  <div>{title}</div>
                  <span>{title}</span>
                </Link>
              ),
            };
          })}
        />
      </div>
    </MainContainer>
  );
}
