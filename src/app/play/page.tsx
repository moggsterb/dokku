import { customCells, loadCells } from '@/lib/cell';

import MainContainer from '@/components/Layout/MainContainer';
import Puzzle from '@/components/Sudoku/GridWrapper';
import { GridStatus } from '@/lib/types';

export default function Play({
  searchParams: { puzzle, custom },
}: {
  searchParams: { puzzle: string; custom: string };
}) {
  const cells = custom ? customCells(custom) : loadCells(Number(puzzle));
  return (
    <MainContainer>
      <Puzzle
        initialCells={cells}
        initialStatus={GridStatus.AUTO}
        showCandidates={false}
        showHints={true}
      />
    </MainContainer>
  );
}
