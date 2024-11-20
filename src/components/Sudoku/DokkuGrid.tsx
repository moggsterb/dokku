import { Dispatch } from 'react';

import { isBrowser } from 'react-device-detect';

import { GridStatus, Grid, SolveType } from '@/utils/types';
import { GridActions } from '@/utils/grid';

import DokkuCell from './DokkuCell';

import styles from './DokkuGrid.module.scss';
import { isCellSolveable } from '@/utils/grid/analyseCells';

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
  const { cells, gridStatus, focusCellID, solveableCells } = grid;

  const handleCellClick = (cellID: number) => {
    if (!gridDispatch || gridStatus === GridStatus.PREVIEW) return;
    if (gridStatus === GridStatus.BUILDER || gridStatus === GridStatus.READY) {
      if (!cells[cellID].value) {
        if (cellID !== focusCellID) {
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
      const solveable = isCellSolveable(solveableCells, cellID, 'any', 'any');
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
    if (!gridDispatch || gridStatus === GridStatus.PREVIEW) return;
    gridDispatch({ type: 'FOCUS_CELL', payload: { cellID, method } });
  };

  const handleCandidateClick = (cellID: number, value: number) => {
    if (!gridDispatch || gridStatus === GridStatus.PREVIEW) return;
    const type = gridStatus === GridStatus.BUILDER ? 'preset' : 'solved';
    gridDispatch({ type: 'SET_CELL', payload: { cellID, value, type } });
  };

  const RenderCells = () => {
    return cells.map((cell, index) => {
      return (
        <DokkuCell
          key={index}
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
    gridStatus === GridStatus.SELECTOR
      ? `${styles.gridSelector} ${isBrowser ? styles.gridHoverable : ''}`
      : ''
  }`;

  return (
    <div className={styles.wrapper}>
      <div className={gridStyle}>{RenderCells()}</div>
    </div>
  );
};

export default DokkuGrid;
