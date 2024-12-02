'use client';

import React from 'react';

import { loadCells } from '@/lib/cell';
import { EXAMPLES, LEVELS } from '@/data/examples';

import MainContainer from '@/components/Layout/MainContainer';
import Portal from '@/components/Layout/Portal';
import GridWrapper from '@/components/Sudoku/GridWrapper';
import Control from '@/components/Controls/Control';
import { DisplayMode, GridStatus } from '@/lib/types';
import { initialGrid } from '@/lib/grid';

export default function Preview({
  params: { id },
}: {
  params: { id: string };
}) {
  const example = EXAMPLES.find((item) => item.id === Number(id));
  const level = LEVELS.find((item) => item.id === example?.level);

  const startGrid = initialGrid(
    GridStatus.PREVIEWING,
    DisplayMode.READY,
    undefined,
    loadCells(Number(id), true)
  );

  return (
    <>
      <MainContainer>
        <GridWrapper startGrid={startGrid} />
      </MainContainer>

      <Portal type='header'>
        <Control
          banner={{
            title: `${level?.title} Grid #${example?.id}`,
            description: `${example?.unsolvedAtStart} cells to solve - (${
              example?.completes ? 'solves in' : 'stalls at'
            } ${example?.cycles} cycles)`,
          }}
        />
      </Portal>
      <Portal type='footer'>
        <Control
          beforeActions={[{ title: 'cancel', url: level?.url || '/' }]}
          afterActions={[
            { title: 'solve', url: `/play?puzzle=${id}`, style: 'solve' },
          ]}
        />
      </Portal>
    </>
  );
}
