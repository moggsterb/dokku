'use client';

import MainContainer from '@/components/MainContainer';
import Puzzle from '@/components/Puzzle';
import { initialCells } from '@/utils/cell';
import React from 'react';

export default function Builder() {
  return (
    <MainContainer>
      <Puzzle
        initialCells={initialCells()}
        initialStatus={'builder'}
        showCandidates={false}
      />
    </MainContainer>
  );
}
