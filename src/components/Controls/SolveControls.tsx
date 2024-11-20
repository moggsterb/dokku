import { Dispatch } from 'react';

import { GridActions } from '@/utils/grid';
import { GridStatus, Grid } from '@/utils/types';

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
  const scanAll = solveableCellsByType['any'];
  const scanBlock = solveableCellsByType['block'];
  const scanColumn = solveableCellsByType['column'];
  const scanRow = solveableCellsByType['row'];
  const singles = solveableCellsByType['single'];

  return (
    <Portal type='footer'>
      <div className={styles.wrapper}>
        {gridDispatch &&
          (gridStatus === GridStatus.READY ||
            gridStatus === GridStatus.AUTO) && (
            <div className={styles.solvers}>
              <SolveController
                type={'any'}
                gridDispatch={gridDispatch}
                cellIDs={scanAll}
                displayMode={displayMode}
              />
              <SolveController
                type={'block'}
                gridDispatch={gridDispatch}
                cellIDs={scanBlock}
                displayMode={displayMode}
              />
              <SolveController
                type={'column'}
                gridDispatch={gridDispatch}
                cellIDs={scanColumn}
                displayMode={displayMode}
              />
              <SolveController
                type={'row'}
                gridDispatch={gridDispatch}
                cellIDs={scanRow}
                displayMode={displayMode}
              />
              <SolveController
                type={'single'}
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
