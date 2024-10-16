'use client';

import MainContainer from '@/components/MainContainer';
import Dokku from '@/components/Dokku';
import LevelSelector from '@/components/LevelSelector';
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <MainContainer>
      <>
        <Dokku />
        <LevelSelector />
<<<<<<< HEAD
        <Link href='/method' className='link' prefetch={false}>
=======
        <Link href='/method' className='link'>
>>>>>>> 1785c4c9ff89e2c023cac5b54feb83bee5696d00
          How Dokku Solves Puzzles
        </Link>
      </>
    </MainContainer>
  );
}
