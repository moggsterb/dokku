'use client';

import { ICell } from '@/utils/types';
import Candidate from './Candidate';

import styles from './Cell.module.scss';
import { IDisplayCellProps } from '@/utils/display';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faSquare, faSquareFull } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowsLeftRight,
  faArrowsUpDown,
  faTableCells,
} from '@fortawesome/free-solid-svg-icons';
import { buildStyle } from '@/utils/helpers';

// npm i --save @awesome.me/kit-ffd1643db8

interface Props {
  displayCell: IDisplayCellProps;
  // mode: string;

  // activeCell: number | undefined;
  // focusCellID: number | undefined;
  // gridStatus: string;
  // isLit: boolean;

  clickHandler?: (value: number) => void;
  focusHandler: (value: number, canFocus: boolean) => void;
  blurHandler: (value: number) => void;
  setHandler: (cellID: number, value: number) => void;
  // canActivate: boolean;
  showCandidates: boolean;
}

const Cell = ({
  displayCell: {
    cell,
    gridStatus,

    hasValue,
    isActive,
    inActiveBlock,
    inActiveColumn,
    inActiveRow,
    hasFocusedValue,
    inBarredBlock,
    inBarredColumn,
    inBarredRow,
    isSolveable,
    canActivate,
  },
  clickHandler,
  focusHandler,
  blurHandler,
  setHandler,
  showCandidates,
}: Props) => {
  const { id, status, value, row, column, candidates } = cell;

  const renderCandidates = (highlightSolve: number = 0) => {
    return (
      <div className={styles.candidates}>
        {candidates.map(({ value, rejected }) => {
          return (
            <Candidate
              key={`candidate-${cell.id}-${value}`}
              cell={cell}
              value={value}
              rejected={rejected}
              canSolve={highlightSolve === value}
              clickHandler={setHandler}
            />
          );
        })}
      </div>
    );
  };

  const renderCell = () => {
    if (hasValue) return renderValue();
    if (isSolveable)
      return isSolveable.type === 'single'
        ? renderSingleSolveable()
        : renderScanSolveable(); // renderScanEnneadType();
    if (showCandidates) return renderCandidates();
    renderBlank();
  };

  const renderBlank = () => {
    return <span className='cell__blank'></span>;
  };

  const renderValue = () => {
    return <div className={styles.value}>{value}</div>;
  };

  // const renderScanEnneadType = () => {
  //   const type = isSolveable && isSolveable.type;
  //   const solveableValue = isSolveable && isSolveable.value;
  //   return (
  //     <div className={styles.solveWrapper}>
  //       <div className={styles.solveIcon}>
  //         {type === 'block' && <FontAwesomeIcon icon={faSquareFull} />}
  //         {type === 'column' && <FontAwesomeIcon icon={faArrowsUpDown} />}
  //         {type === 'row' && <FontAwesomeIcon icon={faArrowsLeftRight} />}
  //       </div>

  //       <div className={styles.solveableValue}>{solveableValue}</div>
  //     </div>
  //   );
  // };

  const renderScanSolveable = () => {
    const type = isSolveable && isSolveable.type;
    const solveableValue = isSolveable && isSolveable.value;
    if (solveableValue)
      return (
        <div className={styles.solveWrapper}>
          <div className={styles.solveIcon}>
            {type === 'block' && <FontAwesomeIcon icon={faSquareFull} />}
            {type === 'column' && <FontAwesomeIcon icon={faArrowsUpDown} />}
            {type === 'row' && <FontAwesomeIcon icon={faArrowsLeftRight} />}
          </div>
          {renderCandidates(solveableValue)}
        </div>
      );
  };

  const renderSingleSolveable = () => {
    const solveableValue = isSolveable && isSolveable.value;
    if (solveableValue)
      return (
        <div className={styles.solveWrapper}>
          {renderCandidates(solveableValue)}
        </div>
      );
  };

  const cellStyle = () => {
    return buildStyle([
      { style: styles.cell, condition: true },
      { style: styles.inSelector, condition: gridStatus === 'selector' },
      { style: styles.topGutter, condition: row === 3 || row === 6 },
      { style: styles.rightGutter, condition: column === 3 || column === 6 },
    ]);
  };

  const innerStyle = () => {
    return buildStyle([
      { style: styles.inner, condition: true },
      { style: styles.active, condition: isActive },
      { style: styles.connectedBlock, condition: inActiveBlock },
      { style: styles.connectedColumn, condition: inActiveColumn },
      { style: styles.connectedRow, condition: inActiveRow },
      { style: styles.canActivate, condition: canActivate },
      { style: styles.focusedValue, condition: hasFocusedValue },
      { style: styles.barredBlock, condition: inBarredBlock },
      { style: styles.barredColumn, condition: inBarredColumn },
      { style: styles.barredRow, condition: inBarredRow },
      {
        style: styles.scanSolveable,
        condition:
          isSolveable && ['block', 'column', 'row'].includes(isSolveable.type),
      },
      {
        style: styles.singleSolveable,
        condition: isSolveable && isSolveable.type === 'single',
      },
      { style: styles.preset, condition: status === 'preset' },
    ]);
  };

  const handleClick = () => {
    if (canActivate && clickHandler) {
      clickHandler(id);
    }
  };

  const handleFocus = () => {
    focusHandler(id, true);
  };

  const handleBlur = () => {
    blurHandler(id);
  };

  return (
    <div className={cellStyle()}>
      <div
        className={innerStyle()}
        onClick={canActivate ? handleClick : undefined}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
      >
        {renderCell()}
      </div>
    </div>
  );
};

export default Cell;
