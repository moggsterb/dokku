import { Dispatch } from 'react';

import { isBrowser } from 'react-device-detect';

import { GridStatus, Grid, SolveType, CellStatus } from '@/lib/types';
import { GridActions } from '@/lib/grid';

import DokkuCell from './DokkuCell';

import styles from './DokkuGrid.module.scss';
import { isCellSolveable } from '@/lib/solving/analyseCells';
import Narrator from './Narrator';
import SolveControls from '../Controls/SolveControls';

interface Props {
  grid: Grid;
  showCandidates?: boolean;
  showHints?: boolean;
  gridDispatch?: Dispatch<GridActions>;
}

const DokkuGrid = ({
  grid,
  showCandidates,
  showHints,
  gridDispatch,
}: Props) => {
  const { cells, gridStatus, displayMode, activeCellID, solveableCells } = grid;

  const handleCellClick = (cellID: number) => {
    if (!gridDispatch || gridStatus === GridStatus.PREVIEWING) return;
    if (
      gridStatus === GridStatus.BUILDING ||
      gridStatus === GridStatus.PLAYING
    ) {
      if (!cells[cellID].value) {
        if (cellID !== activeCellID) {
          gridDispatch({ type: 'FOCUS_CELL', payload: { cellID } });
        } else {
          gridDispatch({ type: 'BLUR_CELL' });
        }
      } else {
        gridDispatch({
          type: 'RESET_CELL',
          payload: {
            cellID: cellID,
          },
        });
      }
    } else {
      const solveable = isCellSolveable(
        solveableCells,
        cellID,
        SolveType.ANY,
        'any'
      );
      if (solveable) {
        gridDispatch({
          type: 'SOLVE_CELLS',
          payload: {
            cellIDs: [cellID],
            value: solveable.value,
          },
        });
      }
    }
  };

  const handleMethodClick = (cellID: number, method: SolveType) => {
    if (!gridDispatch || gridStatus === GridStatus.PREVIEWING) return;
    gridDispatch({ type: 'FOCUS_CELL', payload: { cellID, method } });
  };

  const handleCandidateClick = (cellID: number, value: number) => {
    if (!gridDispatch || gridStatus === GridStatus.PREVIEWING) return;
    const type =
      gridStatus === GridStatus.BUILDING
        ? CellStatus.PRESET
        : CellStatus.SOLVED;
    gridDispatch({ type: 'SET_CELL', payload: { cellID, value, type } });
  };

  const RenderCells = () => {
    return cells.map((cell, index) => {
      return (
        <DokkuCell
          key={index}
          gridStatus={gridStatus}
          displayMode={displayMode}
          cell={cell}
          clickHandler={handleCellClick}
          setHandler={handleCandidateClick}
          methodHandler={handleMethodClick}
          showCandidates={showCandidates || false}
          showHints={showHints || false}
        />
      );
    });
  };

  const gridStyle = `${styles.grid} ${
    gridStatus === GridStatus.SELECTING
      ? `${styles.gridSelector} ${isBrowser ? styles.gridHoverable : ''}`
      : ''
  }`;

  const showExtras =
    gridStatus === GridStatus.PLAYING || gridStatus === GridStatus.ASSEMBLING;

  return (
    <div className={styles.wrapper}>
      {showExtras && <Narrator grid={grid} gridDispatch={gridDispatch} />}
      <div className={gridStyle}>{RenderCells()}</div>
      {showExtras && <SolveControls grid={grid} gridDispatch={gridDispatch} />}
    </div>
  );
};

export default DokkuGrid;
