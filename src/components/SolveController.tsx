import { buildStyle } from '@/utils/helpers';
import styles from './SolveController.module.scss';
import { SolveType } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';
import { GridActions } from '@/utils/grid';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  type: SolveType;
  cellIDs: {
    cellID: number;
    solution: number;
  }[];
  solveState: SolveType | undefined;
  setSolveState: Dispatch<SetStateAction<SolveType | undefined>>;
  gridDispatch: Dispatch<GridActions>;
}

const TYPES = {
  all: { displayMode: 'all_solves' },
  single: { displayMode: 'all_singles' },
  block: { displayMode: 'all_blocks' },
  column: { displayMode: 'all_columns' },
  row: { displayMode: 'all_rows' },
};

const SolveController = ({
  type,
  cellIDs,
  solveState,
  setSolveState,
  gridDispatch,
}: Props) => {
  const isActive = type === solveState;
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
      setSolveState(type);
    } else {
      gridDispatch({
        type: 'UPDATE_MODE',
        payload: { mode: 'ready' },
      });
      setSolveState(undefined);
    }
  };

  const handleSolve = () => {
    gridDispatch({
      type: 'BATCH_SOLVE',
      payload: {
        items: cellIDs,
      },
    });
  };

  const renderRoundel = () => {
    return (
      <div className={styles.roundelHolder}>
        {isActive ? (
          <div
            className={styles.roundel}
            onClick={isActive ? handleSolve : undefined}
          >
            <FontAwesomeIcon icon={faCircleCheck} />
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
      <div className={styles.label}>{type}</div>
      {renderRoundel()}
    </div>
  );
};

export default SolveController;
