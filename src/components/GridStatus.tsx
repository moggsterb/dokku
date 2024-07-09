import { IGrid, SolveType } from '@/utils/types';
import styles from './GridStatus.module.scss';
import { Dispatch, useState } from 'react';
import { GridActions } from '@/utils/grid';

import { isBrowser } from 'react-device-detect';
import SolveController from './SolveController';

interface Props {
  grid: IGrid;
  gridDispatch: Dispatch<GridActions> | undefined;
}

interface SettingProps {
  label: string;
  value: string | number | undefined;
}

const Setting = ({ label, value }: SettingProps) => {
  if (value === undefined) return;
  return (
    <div className={styles.setting}>
      {label}: <span className={styles.value}>{value}</span>
    </div>
  );
};

const GridStatus = ({
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

  const unsolvedCells = cells.filter((item) => item.status === 'unsolved');

  const scanAll = solveableByType['all'];
  const scanBlock = solveableByType['block'];
  const scanColumn = solveableByType['column'];
  const scanRow = solveableByType['row'];
  const singles = solveableByType['single'];

  const updateStatus = (newMode: string, state: boolean) => {
    if (!gridDispatch) return;
    gridDispatch({
      type: 'UPDATE_MODE',
      payload: { mode: state ? newMode : 'ready' },
    });
  };

  return (
    <>
      <div className={styles.top}>
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
      <div className={styles.bottom}>
        <Setting label='Unsolved' value={unsolvedCells.length} />

        {gridStatus !== 'selector' && (
          <>
            <Setting label='Status' value={gridStatus} />
            <Setting label='Is Browser' value={isBrowser ? 'True' : 'False'} />
            <Setting label='Mode' value={displayMode} />
            <Setting label='Cell' value={focusCellID} />
            <Setting label='Value' value={focusValue} />
          </>
        )}
      </div>
    </>
  );
};

export default GridStatus;
