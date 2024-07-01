'use client';

import MainContainer from '@/components/MainContainer';
import Link from 'next/link';

import styles from './page.module.scss';
import AnimReveal from '@/components/AnimReveal';

export default function Home() {
  const header = <h1 style={{ textAlign: 'center' }}>Dokku</h1>;

  const items = [
    { label: 'Easy', url: '/selector/easy', initX: -400 },
    { label: 'Normal', url: '/selector/normal', initX: 400 },
    { label: 'Difficult', url: '/selector/difficult', initX: -400 },
    { label: 'Expert', url: '/selector/expert', initX: 400 },
    { label: 'Create your own', url: '/builder', initX: 0 },
  ];
  return (
    <MainContainer header={header}>
      <div className={styles.levels}>
        <AnimReveal
          items={items.map((item) => {
            return {
              initX: item.initX,
              initOpacity: 0,
              component: (
                <Link href={item.url}>
                  <div>{item.label}</div>
                  <span>{item.label}</span>
                </Link>
              ),
            };
          })}
        />
      </div>
    </MainContainer>
  );
}
