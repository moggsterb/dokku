import { ICell, IEnneads, IGrid } from '@/utils/types';
import Cell from './Cell';
import { Dispatch, SetStateAction } from 'react';
import GridStatus from './GridStatus';

import styles from './Grid.module.scss';
import { displayCell, isCellSolveable } from '@/utils/display';
import { GridActions } from '@/utils/grid';

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
    if (!gridDispatch || gridStatus === 'preview') return;

    if (gridStatus === 'builder' || gridStatus === 'ready') {
      if (!cells[cellID].value) {
        gridDispatch({ type: 'FOCUS_CELL', payload: { cellID } });
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

  const handleCandidateClick = (cellID: number, value: number) => {
    if (!gridDispatch || gridStatus === 'preview') return;
    const type = gridStatus === 'builder' ? 'preset' : 'solved';
    gridDispatch({ type: 'SET_CELL', payload: { cellID, value, type } });
  };

  const RenderCells = () => {
    const focusCellObj =
      focusCellID !== undefined ? cells[focusCellID] : undefined;

    return cells.map((cell, index) => {
      const dc = displayCell(
        cells,
        enneads,
        cell,
        gridStatus,
        displayMode,
        focusCellObj,
        focusValue,
        solveableCells,
        focusSolveable
      );
      return (
        <Cell
          key={index}
          displayCell={dc}
          clickHandler={handleCellClick}
          setHandler={handleCandidateClick}
          showCandidates={showCandidates || false}
          showHints={showHints || false}
        />
      );
    });
  };

  const gridStyle = `${styles.grid} ${
    gridStatus === 'selector' ? styles.gridSelector : ''
  }`;

  return (
    <div className={styles.wrapper}>
      <div className={gridStyle}>{RenderCells()}</div>
      <GridStatus grid={grid} gridDispatch={gridDispatch} />
    </div>
  );
};

export default Grid;
