'use client';

import Puzzle from '@/components/Puzzle';
import MainContainer from '@/components/MainContainer';
import { loadCells } from '@/utils/cell';
import { EXAMPLES, LEVELS } from '@/utils/examples';
import Control from '@/components/Control';
import Portal from '@/components/Portal';
import React from 'react';

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
