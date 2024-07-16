'use client';

import MainContainer from '@/components/MainContainer';
import Dokku from '@/components/Dokku';
import LevelSelector from '@/components/LevelSelector';

export default function Home() {
  return (
    <MainContainer header={<Dokku />}>
      <LevelSelector />
    </MainContainer>
  );
}
