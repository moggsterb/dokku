import { ICell, IEnneads, IGrid } from '@/utils/types';
import Cell from './Cell';
import { Dispatch, SetStateAction } from 'react';
import GridStatus from './GridStatus';

import styles from './Grid.module.scss';
import { displayCell } from '@/utils/display';
import { GridActions } from '@/utils/grid';

interface Props {
  grid: IGrid;
  showCandidates?: boolean;
  gridDispatch?: Dispatch<GridActions>;
}

const Grid = ({ grid, showCandidates, gridDispatch }: Props) => {
  const {
    cells,
    enneads,
    gridStatus,
    displayMode,
    focusCell,
    focusValue,
    scanningSolves,
    singleSolves,
    focusSolveable,
  } = grid;

  const handleCellClick = (cellID: number) => {
    if (!gridDispatch || gridStatus === 'preview') return;
    if (cells[cellID].value) {
      const cellIDs = scanningSolves
        .filter((item) => item.option === focusValue)
        .map((item) => item.cellID);

      gridDispatch({
        type: 'SOLVE_CELLS',
        payload: {
          cellIDs,
          value: cells[cellID].value,
        },
      });
    }
  };

  const handleCellFocus = (cellID: number, canFocus: boolean) => {
    if (!gridDispatch || gridStatus === 'preview') return;
    gridDispatch({ type: 'FOCUS_CELL', payload: { cellID } });
  };

  const handleCellBlur = (value: number) => {
    if (!gridDispatch || gridStatus === 'preview') return;
    gridDispatch({ type: 'BLUR_CELL' });
  };

  const RenderCells = () => {
    const focusCellObj = focusCell !== undefined ? cells[focusCell] : undefined;

    return cells.map((cell, index) => {
      return (
        <Cell
          key={index}
          displayCell={displayCell(
            cells,
            enneads,
            cell,
            gridStatus,
            displayMode,
            focusCellObj,
            focusValue,
            scanningSolves,
            singleSolves,
            focusSolveable
          )}
          clickHandler={handleCellClick}
          focusHandler={handleCellFocus}
          blurHandler={handleCellBlur}
          showCandidates={showCandidates || false}
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
