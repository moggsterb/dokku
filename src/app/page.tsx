'use client';

import MainContainer from '@/components/MainContainer';
import Link from 'next/link';

import styles from './page.module.scss';
import AnimReveal from '@/components/AnimReveal';

export default function Home() {
  const header = <h1 style={{ textAlign: 'center' }}>Dokku</h1>;

  const items = [
    { label: 'Easy', url: '/selector/easy' },
    { label: 'Normal', url: '/selector/normal' },
    { label: 'Difficult', url: '/selector/difficult' },
    { label: 'Expert', url: '/selector/expert' },
    { label: 'Create your own', url: '/builder' },
  ];
  return (
    <MainContainer header={header}>
      <div className={styles.levels}>
        <AnimReveal
          items={items.map((item) => {
            return {
              initX: -200,
              initOpacity: 0,
              component: <Link href={item.url}>{item.label}</Link>,
            };
          })}
        />
      </div>
    </MainContainer>
  );
}
