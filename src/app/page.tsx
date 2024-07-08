'use client';

import MainContainer from '@/components/MainContainer';
import Link from 'next/link';

import styles from './page.module.scss';
import AnimReveal from '@/components/AnimReveal';
import { LEVELS } from '@/utils/examples';

export default function Home() {
  const header = <h1 className={styles.header}>Dokku</h1>;

  const levels = LEVELS.map(({ title, slug }, index) => {
    return {
      title,
      url: `/selector/${slug}`,
      initX: index % 2 ? -400 : 400,
      marginTop: 0,
    };
  });
  levels.push({
    title: 'Create your own',
    url: '/builder',
    initX: 400,
    marginTop: 20,
  });

  return (
    <MainContainer header={header}>
      <div className={styles.levels}>
        <AnimReveal
          items={levels.map(({ title, url, initX, marginTop }) => {
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
