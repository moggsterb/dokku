'use client';

import React from 'react';
import Link from 'next/link';

import MainContainer from '@/components/Layout/MainContainer';
import Dokku from '@/components/Home/Dokku';
import LevelSelector from '@/components/Home/LevelSelector';

export default function Home() {
  return (
    <MainContainer>
      <Dokku />
      <LevelSelector />
      <Link href='/method' className='link' prefetch={false}>
        How Dokku Solves Puzzles
      </Link>
    </MainContainer>
  );
}
