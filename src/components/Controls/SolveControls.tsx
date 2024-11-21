import { Dispatch } from 'react';

import { GridActions } from '@/lib/grid';
import { GridStatus, Grid, EnneadType, SolveType } from '@/lib/types';

import SolveController from './SolveController';
import Portal from '../Layout/Portal';

import styles from './SolveControls.module.scss';

interface Props {
  grid: Grid;
  gridDispatch: Dispatch<GridActions> | undefined;
}

const SolveControls = ({
  grid: { gridStatus, displayMode, solveableCellsByType },
  gridDispatch,
}: Props) => {
  const scanAll = solveableCellsByType[SolveType.ANY];
  const scanBlock = solveableCellsByType[SolveType.BLOCK];
  const scanColumn = solveableCellsByType[SolveType.COLUMN];
  const scanRow = solveableCellsByType[SolveType.ROW];
  const singles = solveableCellsByType[SolveType.SINGLE];

  return (
    <Portal type='footer'>
      <div className={styles.wrapper}>
        {gridDispatch &&
          (gridStatus === GridStatus.READY ||
            gridStatus === GridStatus.AUTO) && (
            <div className={styles.solvers}>
              <SolveController
                type={SolveType.ANY}
                gridDispatch={gridDispatch}
                cellIDs={scanAll}
                displayMode={displayMode}
              />
              <SolveController
                type={SolveType.BLOCK}
                gridDispatch={gridDispatch}
                cellIDs={scanBlock}
                displayMode={displayMode}
              />
              <SolveController
                type={SolveType.COLUMN}
                gridDispatch={gridDispatch}
                cellIDs={scanColumn}
                displayMode={displayMode}
              />
              <SolveController
                type={SolveType.ROW}
                gridDispatch={gridDispatch}
                cellIDs={scanRow}
                displayMode={displayMode}
              />
              <SolveController
                type={SolveType.SINGLE}
                gridDispatch={gridDispatch}
                cellIDs={singles}
                displayMode={displayMode}
              />
            </div>
          )}
      </div>
    </Portal>
  );
};

export default SolveControls;
