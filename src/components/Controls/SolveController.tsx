import React, { Dispatch } from 'react';

import { buildStyle } from '@/utils/helpers';
import { DisplayMode, SolveType } from '@/utils/types';

import { GridActions } from '@/utils/grid';

import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SolveController.module.scss';
interface Props {
  type: SolveType;
  cellIDs: {
    cellID: number;
    solution: number;
  }[];
  displayMode: string;
  gridDispatch: Dispatch<GridActions>;
}

const TYPES = {
  any: { displayMode: DisplayMode.ALL_ANY },
  single: { displayMode: DisplayMode.ALL_SINGLE },
  block: { displayMode: DisplayMode.ALL_BLOCK },
  column: { displayMode: DisplayMode.ALL_COLUMN },
  row: { displayMode: DisplayMode.ALL_ROW },
};

const SolveController = ({
  type,
  cellIDs,
  displayMode,
  gridDispatch,
}: Props) => {
  const isActive = displayMode === TYPES[type].displayMode;
  const isDisabled = cellIDs.length === 0;

  const wrapperStyle = () => {
    return buildStyle([
      { style: styles.wrapper, condition: true },
      { style: styles[type], condition: true },
      { style: styles.active, condition: isActive },
      { style: styles.disabled, condition: isDisabled },
      { style: styles.hoverable, condition: !isDisabled },
    ]);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isActive) {
      gridDispatch({
        type: 'UPDATE_MODE',
        payload: { mode: TYPES[type].displayMode },
      });
    } else {
      gridDispatch({
        type: 'BATCH_SOLVE',
        payload: {
          items: cellIDs,
        },
      });
      gridDispatch({
        type: 'UPDATE_MODE',
        payload: { mode: DisplayMode.READY },
      });
    }
  };

  const handleCancel = (e: any) => {
    e.stopPropagation();
    gridDispatch({
      type: 'UPDATE_MODE',
      payload: { mode: DisplayMode.READY },
    });
    // setSolveState(undefined);
  };

  const renderRoundel = () => {
    return (
      <div className={styles.roundelHolder}>
        {isActive ? (
          <div
            className={styles.roundel}
            onClick={isActive ? handleCancel : undefined}
          >
            <FontAwesomeIcon icon={faXmark} size='1x' />
          </div>
        ) : (
          <div className={styles.roundel}>{cellIDs.length}</div>
        )}
      </div>
    );
  };

  return (
    <div
      className={wrapperStyle()}
      onClick={!isDisabled ? handleClick : undefined}
    >
      <div className={styles.label}>
        {isActive ? (
          <>
            <FontAwesomeIcon icon={faCircleCheck} size='lg' />
            {'  '}Solve
          </>
        ) : (
          type
        )}
      </div>
      {renderRoundel()}
    </div>
  );
};

export default SolveController;
