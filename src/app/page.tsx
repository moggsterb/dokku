'use client';

import MainContainer from '@/components/MainContainer';
import Dokku from '@/components/Dokku';
import LevelSelector from '@/components/LevelSelector';
import React from 'react';

export default function Home() {
  return (
    <MainContainer>
      <>
        <Dokku />
        <LevelSelector />
      </>
    </MainContainer>
  );
}
