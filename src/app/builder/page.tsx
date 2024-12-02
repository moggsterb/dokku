'use client';

import React from 'react';

import { initialCells } from '@/lib/cell';

import MainContainer from '@/components/Layout/MainContainer';
import GridWrapper from '@/components/Sudoku/GridWrapper';
import { DisplayMode, GridStatus } from '@/lib/types';
import { initialGrid } from '@/lib/grid';

export default function Builder() {
  const startGrid = initialGrid(
    GridStatus.BUILDING,
    DisplayMode.READY,
    undefined,
    initialCells()
  );
  return (
    <MainContainer>
      <GridWrapper startGrid={startGrid} showCandidates={false} />
    </MainContainer>
  );
}
