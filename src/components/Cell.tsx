'use client';

import { isBrowser } from 'react-device-detect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFull } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowsLeftRight,
  faArrowsUpDown,
  fa1,
} from '@fortawesome/free-solid-svg-icons';

import Candidate from './Candidate';
import styles from './Cell.module.scss';
import { IDisplayCellProps } from '@/utils/display';
import { buildStyle } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { SolveType } from '@/utils/types';

interface Props {
  displayCell: IDisplayCellProps;

  clickHandler?: (value: number) => void;
  // focusHandler: (value: number, canFocus: boolean) => void;
  // blurHandler: (value: number) => void;
  setHandler: (cellID: number, value: number) => void;
  methodHandler: (cellID: number, method: SolveType) => void;
  showCandidates: boolean;
  showHints?: boolean;
}

const ICONS = {
  all: { icon: fa1 },
  single: { icon: fa1 },
  block: { icon: faSquareFull },
  column: { icon: faArrowsUpDown },
  row: { icon: faArrowsLeftRight },
};

const Cell = ({
  displayCell: {
    cell,
    focusCellID,
    gridStatus,
    displayMode,
    hasValue,
    isActive,
    inConnectedBlock,
    inConnectedColumn,
    inConnectedRow,
    hasFocusedValue,
    inBarredBlock,
    inBarredColumn,
    inBarredRow,
    isSolveable,
    allSolveMethods,
    canActivate,
  },
  clickHandler,
  setHandler,
  methodHandler,
  showCandidates,
  showHints = false,
}: Props) => {
  const { id, status, value, row, column, candidates } = cell;
  const [animID, setAnimID] = useState<number | undefined>(undefined);

  useEffect(() => {
    const animRequired =
      (value !== undefined || id === focusCellID) &&
      displayMode === 'cell_single' &&
      (inConnectedBlock || inConnectedColumn || inConnectedRow);

    if (animID !== focusCellID) {
      setAnimID(animRequired ? focusCellID : undefined);
    }
  }, [focusCellID, animID]);

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
              animStyle={getAnimStyle(
                id === animID && value === highlightSolve ? highlightSolve : 0,
                'pulseBig'
              )}
              canSet={isActive}
              clickHandler={setHandler}
            />
          );
        })}
      </div>
    );
  };

  const renderCell = () => {
    if (hasValue) return renderValue();
    if (isSolveable) return renderSolveable();
    if (!true) return renderBlank();
    return (
      <>
        {showHints && renderSolveHints()}
        {(isActive || showCandidates) && renderCandidates()}
      </>
    );
  };

  const renderBlank = () => {
    return <span className='cell__blank'></span>;
  };

  const renderValue = () => {
    return <div className={styles.value}>{value}</div>;
  };

  const renderSolveable = () => {
    const solveableValue = isSolveable && isSolveable.value;
    if (solveableValue)
      return (
        <div className={styles.solveWrapper}>
          {renderSolveHints()}
          {renderCandidates(solveableValue)}
        </div>
      );
  };

  const renderSolveHints = () => {
    return (
      <div className={styles.solveIconWrapper}>
        {allSolveMethods.map((method, index) => {
          const icon = ICONS[method].icon;
          return (
            <div
              key={`${cell.id}-${method}-${index}`}
              className={`${styles.solveIcon} ${styles[method]}`}
              onClick={(e) => {
                methodHandler(id, method);
                e.stopPropagation();
              }}
            />
          );
        })}
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
      { style: styles.connectedBlock, condition: inConnectedBlock },
      { style: styles.connectedColumn, condition: inConnectedColumn },
      { style: styles.connectedRow, condition: inConnectedRow },
      { style: styles.focusedValue, condition: hasFocusedValue },
      { style: styles.barredBlock, condition: inBarredBlock },
      { style: styles.barredColumn, condition: inBarredColumn },
      { style: styles.barredRow, condition: inBarredRow },
      {
        style: styles.solveableAll,
        condition: displayMode === 'all_solves' && isSolveable !== false,
      },
      {
        style: styles.solveableBlock,
        condition: displayMode === 'all_blocks' && isSolveable !== false,
      },
      {
        style: styles.solveableColumn,
        condition: displayMode === 'all_columns' && isSolveable !== false,
      },
      {
        style: styles.solveableRow,
        condition: displayMode === 'all_rows' && isSolveable !== false,
      },
      {
        style: styles.solveableSingle,
        condition: displayMode === 'all_singles' && isSolveable !== false,
      },
      { style: styles.preset, condition: status === 'preset' },
      {
        style: styles.hoverable,
        condition:
          isBrowser && cell.status !== 'preset' && gridStatus === 'ready', // && canActivate && !isActive,
      },
      {
        style: styles.singleSolve,
        condition: displayMode === 'cell_single' && isActive,
      },
    ]);
  };

  const handleClick = () => {
    if (canActivate && clickHandler) {
      clickHandler(id);
    }
  };

  const getAnimStyle = (delay: number, name: string) => {
    if (animID && animID === focusCellID && delay) {
      return {
        animationName: name,
        animationDuration: '5s',
        animationIterationCount: 'infinite',
        animationDelay: `${Number(delay) / 2}s`,
      };
    } else {
      return {};
    }
  };

  return (
    <div className={cellStyle()}>
      <div
        className={innerStyle()}
        // onClick={canActivate && !isActive ? handleClick : undefined}
        onClick={handleClick}
        style={getAnimStyle(Number(value), 'pulse')}
      >
        {renderCell()}
      </div>
    </div>
  );
};

export default Cell;
