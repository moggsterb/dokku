'use client';

import React from 'react';

import { initialCells } from '@/utils/cell';

import MainContainer from '@/components/Layout/MainContainer';
import Puzzle from '@/components/Sudoku/Puzzle';

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
