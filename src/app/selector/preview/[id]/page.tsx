'use client';

import React from 'react';

import { loadCells } from '@/utils/cell';
import { EXAMPLES, LEVELS } from '@/utils/examples';

import MainContainer from '@/components/Layout/MainContainer';
import Portal from '@/components/Layout/Portal';
import Puzzle from '@/components/Sudoku/Puzzle';
import Control from '@/components/Controls/Control';

export default function Preview({
  params: { id },
}: {
  params: { id: string };
}) {
  const example = EXAMPLES.find((item) => item.id === Number(id));
  const level = LEVELS.find((item) => item.id === example?.level);

  return (
    <>
      <MainContainer>
        <Puzzle initialCells={loadCells(Number(id))} initialStatus='preview' />
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
