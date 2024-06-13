'use client';

import { useReducer } from 'react';
import { ICell } from '@/utils/types';
import ValueSelector from './ValueSelector';
import { getTakenValues } from '@/utils/solving/analysis';
import MainContainer from './MainContainer';
import Grid from './Grid';
import ControlPanel from './ControlPanel';

import { gridReducer, initialGrid } from '@/utils/grid';
import Scanner from './SolveScanning';
import SolveScanning from './SolveScanning';
import SolveSingles from './SolveSingles';

interface Props {
  initialCells: ICell[];
  initialStatus: string; // builder, preview, play
  showCandidates?: boolean;
}

const Puzzle = ({
  initialCells,
  initialStatus,
  showCandidates = false,
}: Props) => {
  const [grid, gridDispatch] = useReducer(
    gridReducer,
    initialGrid(initialStatus, initialCells)
  );

  const { gridStatus, cells, enneads, focusCell, focusValue } = grid;

  const setCellValue = (value: number | string) => {
    if (focusCell !== undefined) {
      const cell = { ...cells[focusCell] };

      cell.value = typeof value === 'number' ? value : 0;
      cell.status =
        typeof value === 'number'
          ? gridStatus === 'builder'
            ? 'preset'
            : 'solved'
          : 'unsolved';

      gridDispatch({ type: 'UPDATE_CELL', payload: { cell } });
      // setActiveCell(undefined);
    }
  };

  const updateCandidates = () => {
    // const newCells = updateCellCandidates(cells, 1);
    // cellDispatch({
    //   type: 'UPDATE_CELLS',
    //   payload: { cells: newCells },
    // });
    // console.log({ newCells });
  };

  const header = (
    <>
      {gridStatus === 'ready' && (
        <>
          {/* <SolveScanning grid={grid} gridDispatch={gridDispatch} />
          <SolveSingles grid={grid} gridDispatch={gridDispatch} /> */}
        </>
      )}
      {/* {focusCell !== undefined ? (
        <ValueSelector
          taken={getTakenValues(cells, cells[focusCell])}
          setCellValue={setCellValue}
        />
      ) : (
        <ControlPanel
          cells={cells}
          enneads={enneads}
          showCandidates={showCandidates}
          gridDispatch={gridDispatch}
          // cellDispatch={cellDispatch}
          // setGridStatus={setGridStatus}
          // setShowCandidates={setShowCandidates}
          updateCandidates={updateCandidates}
        />
      )} */}
    </>
  );

  return (
    <>
      <MainContainer header={initialStatus !== 'preview' && header}>
        <Grid
          grid={grid}
          showCandidates={showCandidates}
          gridDispatch={gridDispatch}
          // setActiveCell={setActiveCell}
          // setFocusCell={setFocusCell}
        />
      </MainContainer>
    </>
  );
};

export default Puzzle;
