import { IGrid } from '@/utils/types';
import styles from './GridStatus.module.scss';
import { onlyUnique } from '@/utils/helpers';
import LabelCounter from './LabelCounter';
import { Dispatch } from 'react';
import { GridActions } from '@/utils/grid';

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
    focusCell,
    focusValue,
    cells,
    scanningSolves,
    singleSolves,
  },
  gridDispatch,
}: Props) => {
  const unsolvedCells = cells.filter((item) => item.status === 'unsolved');

  const scannableCells = scanningSolves
    .map((item) => item.cellID)
    .filter(onlyUnique).length;

  const singles = singleSolves.length;

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
        <LabelCounter text='Unsolved' count={unsolvedCells.length} />
        {gridStatus === 'ready' && (
          <div className={styles.solvers}>
            <LabelCounter
              text='Scannable'
              count={scannableCells}
              theme={'scanning'}
              handler={(state: boolean) => {
                updateStatus('scanning_all', state);
              }}
            />
            <LabelCounter
              text='Singles'
              count={singles}
              theme={'single'}
              handler={(state: boolean) => {
                updateStatus('singles_all', state);
              }}
            />
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <Setting label='Status' value={gridStatus} />
        <Setting label='Mode' value={displayMode} />
        <Setting label='Cell' value={focusCell} />
        <Setting label='Value' value={focusValue} />
      </div>
    </>
  );
};

export default GridStatus;
