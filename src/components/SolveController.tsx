import { buildStyle } from '@/utils/helpers';
import styles from './SolveController.module.scss';
import { SolveType } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';
import { GridActions } from '@/utils/grid';
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
  type: SolveType;
  cellIDs: {
    cellID: number;
    solution: number;
  }[];
  // solveState: SolveType | undefined;
  // setSolveState: Dispatch<SetStateAction<SolveType | undefined>>;
  displayMode: string;
  gridDispatch: Dispatch<GridActions>;
}

const TYPES = {
  any: { displayMode: 'all_any' },
  single: { displayMode: 'all_single' },
  block: { displayMode: 'all_block' },
  column: { displayMode: 'all_column' },
  row: { displayMode: 'all_row' },
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

  const handleClick = () => {
    if (!isActive) {
      gridDispatch({
        type: 'UPDATE_MODE',
        payload: { mode: TYPES[type].displayMode },
      });
      // setSolveState(type);
    } else {
      gridDispatch({
        type: 'BATCH_SOLVE',
        payload: {
          items: cellIDs,
        },
      });
      gridDispatch({
        type: 'UPDATE_MODE',
        payload: { mode: 'ready' },
      });
      // setSolveState(undefined);
    }
  };

  const handleCancel = (e: any) => {
    e.stopPropagation();
    gridDispatch({
      type: 'UPDATE_MODE',
      payload: { mode: 'ready' },
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
