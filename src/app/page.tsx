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
        <Link href='/method' className='link' prefetch={false}>
          How Dokku Solves Puzzles
        </Link>
      </>
    </MainContainer>
  );
}
