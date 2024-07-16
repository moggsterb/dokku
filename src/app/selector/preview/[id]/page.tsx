'use client';

import Puzzle from '@/components/Puzzle';
import MainContainer from '@/components/MainContainer';
import { loadCells } from '@/utils/cell';
import { EXAMPLES, LEVELS } from '@/utils/examples';
import Control from '@/components/Control';

export default function Preview({
  params: { id },
}: {
  params: { id: string };
}) {
  const example = EXAMPLES.find((item) => item.id === Number(id));
  const level = LEVELS.find((item) => item.id === example?.level);

  const footer = (
    <Control
      title={example?.title || ''}
      description={`${example?.unsolvedAtStart} cells to solve - (${
        example?.completes ? 'solves in' : 'stalls at'
      } ${example?.cycles} cycles)`}
      beforeActions={[{ title: 'cancel', url: level?.url || '/' }]}
      afterActions={[{ title: 'solve', url: `/play?puzzle=${id}` }]}
    />
  );

  return (
    <MainContainer footer={footer}>
      <Puzzle initialCells={loadCells(Number(id))} initialStatus='preview' />
    </MainContainer>
  );
}
