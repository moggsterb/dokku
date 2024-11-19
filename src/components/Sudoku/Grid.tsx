import { Dispatch } from 'react';

import { isBrowser } from 'react-device-detect';

import { GridStatus, IGrid, SolveType } from '@/utils/types';
import { GridActions } from '@/utils/grid';

import Cell from './Cell';

import styles from './Grid.module.scss';
import {
  enhanceCellForDisplay,
  isCellSolveable,
} from '@/utils/display/cellDisplayState';

interface Props {
  grid: IGrid;
  showCandidates?: boolean;
  showHints?: boolean;
  gridDispatch?: Dispatch<GridActions>;
}

const Grid = ({ grid, showCandidates, showHints, gridDispatch }: Props) => {
  const {
    cells,
    enneads,
    gridStatus,
    displayMode,
    focusCellID,
    focusValue,
    solveableCells,
    focusSolveable,
  } = grid;

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
    const focusCellObj =
      focusCellID !== undefined ? cells[focusCellID] : undefined;

    return cells.map((cell, index) => {
      const dc = enhanceCellForDisplay({
        cells,
        enneads,
        cell,
        gridStatus,
        displayMode,
        focusCellObj,
        focusValue,
        solveableCells,
        focusSolveable,
      });
      return (
        <Cell
          key={index}
          displayCell={dc}
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

export default Grid;
