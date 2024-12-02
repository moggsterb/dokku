import { customCells, loadCells } from '@/lib/cell';

import MainContainer from '@/components/Layout/MainContainer';
import GridWrapper from '@/components/Sudoku/GridWrapper';
import { DisplayMode, GridStatus, SequenceType } from '@/lib/types';
import { initialGrid, initialiseSequence } from '@/lib/grid';

export default function Play({
  searchParams: { puzzle, custom },
}: {
  searchParams: { puzzle: string; custom: string };
}) {
  const cells = custom ? customCells(custom, false) : loadCells(Number(puzzle));

  const startGrid = initialGrid(
    GridStatus.ASSEMBLING,
    DisplayMode.ASSEMBLE,
    initialiseSequence(SequenceType.ASSEMBLE),
    cells
  );
  return (
    <MainContainer>
      <GridWrapper
        // initialCells={cells}
        // initialStatus={GridStatus.ASSEMBLING}
        startGrid={startGrid}
        showCandidates={false}
        showHints={true}
      />
    </MainContainer>
  );
}
