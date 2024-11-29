'use client';

import React from 'react';

import { initialCells } from '@/lib/cell';

import MainContainer from '@/components/Layout/MainContainer';
import Puzzle from '@/components/Sudoku/GridWrapper';
import { GridStatus } from '@/lib/types';

export default function Builder() {
  return (
    <MainContainer>
      <Puzzle
        initialCells={initialCells()}
        initialStatus={GridStatus.BUILDING}
        showCandidates={false}
      />
    </MainContainer>
  );
}
