'use client';

import { ICell } from '@/utils/types';
import MainContainer from './MainContainer';
import Grid from './Grid';

import useControl from '@/utils/hooks/useControl';
import ControlBuilder from './ControlBuilder';

interface Props {
  initialCells: ICell[];
  initialStatus: string; // builder, preview, play
  showCandidates?: boolean;
  showHints?: boolean;
}

const Puzzle = ({
  initialCells,
  initialStatus,
  showCandidates = false,
  showHints = false,
}: Props) => {
  const { grid, gridDispatch } = useControl(initialStatus, initialCells);
  const { gridStatus, cells, enneads, focusCellID, focusValue } = grid;

  const setCellValue = (value: number | string) => {
    if (focusCellID !== undefined) {
      const cell = { ...cells[focusCellID] };

      cell.value = typeof value === 'number' ? value : 0;
      cell.status =
        typeof value === 'number'
          ? gridStatus === 'builder'
            ? 'preset'
            : 'solved'
          : 'unsolved';
    }
  };

  const header =
    gridStatus === 'builder' ? (
      <ControlBuilder grid={grid} gridDispatch={gridDispatch} />
    ) : gridStatus !== 'preview' ? (
      <></>
    ) : undefined;

  return (
    <>
      <MainContainer header={header}>
        <Grid
          grid={grid}
          showCandidates={showCandidates}
          showHints={showHints}
          gridDispatch={gridDispatch}
        />
      </MainContainer>
    </>
  );
};

export default Puzzle;
