'use client';

import React from 'react';

import { initialCells } from '@/utils/cell';

import MainContainer from '@/components/Layout/MainContainer';
import Puzzle from '@/components/Sudoku/GridWrapper';
import { GridStatus } from '@/utils/types';

export default function Builder() {
  return (
    <MainContainer>
      <Puzzle
        initialCells={initialCells()}
        initialStatus={GridStatus.BUILDER}
        showCandidates={false}
      />
    </MainContainer>
  );
}
