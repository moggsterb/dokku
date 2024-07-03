import { IGrid } from '@/utils/types';
import styles from './GridStatus.module.scss';
import LabelCounter from './LabelCounter';
import { Dispatch } from 'react';
import { filterSolveableCells, GridActions } from '@/utils/grid';

import { isBrowser } from 'react-device-detect';

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
    solveableCells,
    solveableByType,
  },
  gridDispatch,
}: Props) => {
  const unsolvedCells = cells.filter((item) => item.status === 'unsolved');

  // const scanBlock = filterSolveableCells(solveableCells, 'block');
  // const scanColumn = filterSolveableCells(solveableCells, 'column');
  // const scanRow = filterSolveableCells(solveableCells, 'row');
  // const singles = filterSolveableCells(solveableCells, 'single');

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
        {gridStatus === 'ready' && (
          <div className={styles.solvers}>
            <LabelCounter
              text='All Solves'
              count={scanAll.length}
              theme={'scanning'}
              enterHandler={(state: boolean) => {
                updateStatus('scanning_blocks', state);
              }}
              clickHandler={() => {
                if (!gridDispatch) return;
                gridDispatch({
                  type: 'BATCH_SOLVE',
                  payload: {
                    items: scanAll,
                  },
                });
              }}
            />
            <LabelCounter
              text='Block'
              count={scanBlock.length}
              theme={'scanning'}
              enterHandler={(state: boolean) => {
                updateStatus('scanning_blocks', state);
              }}
              clickHandler={() => {
                if (!gridDispatch) return;
                gridDispatch({
                  type: 'BATCH_SOLVE',
                  payload: {
                    items: scanBlock,
                  },
                });
              }}
            />
            <LabelCounter
              text='Column'
              count={scanColumn.length}
              theme={'scanning'}
              enterHandler={(state: boolean) => {
                updateStatus('scanning_columns', state);
              }}
              clickHandler={() => {
                if (!gridDispatch) return;
                gridDispatch({
                  type: 'BATCH_SOLVE',
                  payload: {
                    items: scanColumn,
                  },
                });
              }}
            />
            <LabelCounter
              text='Row'
              count={scanRow.length}
              theme={'scanning'}
              enterHandler={(state: boolean) => {
                updateStatus('scanning_rows', state);
              }}
              clickHandler={() => {
                if (!gridDispatch) return;
                gridDispatch({
                  type: 'BATCH_SOLVE',
                  payload: {
                    items: scanRow,
                  },
                });
              }}
            />
            <LabelCounter
              text='Singles'
              count={singles.length}
              theme={'single'}
              enterHandler={(state: boolean) => {
                updateStatus('singles_all', state);
              }}
              clickHandler={() => {
                if (!gridDispatch) return;
                gridDispatch({
                  type: 'BATCH_SOLVE',
                  payload: {
                    items: singles,
                  },
                });
              }}
            />
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <Setting label='Unsolved' value={unsolvedCells.length} />
        <Setting label='Status' value={gridStatus} />
        {gridStatus !== 'selector' && (
          <>
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
