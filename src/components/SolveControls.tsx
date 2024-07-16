import { GridActions } from '@/utils/grid';
import { IGrid, SolveType } from '@/utils/types';
import { Dispatch, useState } from 'react';
import SolveController from './SolveController';

import styles from './SolveControls.module.scss';

interface Props {
  grid: IGrid;
  gridDispatch: Dispatch<GridActions> | undefined;
}

const SolveControls = ({
  grid: {
    gridStatus,
    displayMode,
    focusCellID,
    focusValue,
    cells,
    solveableByType,
  },
  gridDispatch,
}: Props) => {
  const [solveState, setSolveState] = useState<SolveType | undefined>();

  const scanAll = solveableByType['all'];
  const scanBlock = solveableByType['block'];
  const scanColumn = solveableByType['column'];
  const scanRow = solveableByType['row'];
  const singles = solveableByType['single'];

  return (
    <div className={styles.wrapper}>
      {gridDispatch && (gridStatus === 'ready' || gridStatus === 'auto') && (
        <div className={styles.solvers}>
          <SolveController
            type={'all'}
            gridDispatch={gridDispatch}
            cellIDs={scanAll}
            solveState={solveState}
            setSolveState={setSolveState}
          />
          <SolveController
            type={'block'}
            gridDispatch={gridDispatch}
            cellIDs={scanBlock}
            solveState={solveState}
            setSolveState={setSolveState}
          />
          <SolveController
            type={'column'}
            gridDispatch={gridDispatch}
            cellIDs={scanColumn}
            solveState={solveState}
            setSolveState={setSolveState}
          />
          <SolveController
            type={'row'}
            gridDispatch={gridDispatch}
            cellIDs={scanRow}
            solveState={solveState}
            setSolveState={setSolveState}
          />
          <SolveController
            type={'single'}
            gridDispatch={gridDispatch}
            cellIDs={singles}
            solveState={solveState}
            setSolveState={setSolveState}
          />
        </div>
      )}
    </div>
  );
};

export default SolveControls;
