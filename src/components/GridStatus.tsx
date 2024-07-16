import { IGrid } from '@/utils/types';
import styles from './GridStatus.module.scss';
import { Dispatch } from 'react';
import { GridActions } from '@/utils/grid';

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
  grid: { gridStatus, displayMode, focusCellID, focusValue, cells },
  gridDispatch,
}: Props) => {
  const unsolvedCells = cells.filter((item) => item.status === 'unsolved');

  return (
    <>
      <div className={styles.top}>
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
