import { GridActions } from '@/utils/grid';
import { IGrid } from '@/utils/types';
import { Dispatch } from 'react';
import SolveController from './SolveController';

import styles from './SolveControls.module.scss';

interface Props {
  grid: IGrid;
  gridDispatch: Dispatch<GridActions> | undefined;
}

const SolveControls = ({
  grid: { gridStatus, displayMode, solveableByType },
  gridDispatch,
}: Props) => {
  // const [solveState, setSolveState] = useState<SolveType | undefined>();

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
  );
};

export default SolveControls;
