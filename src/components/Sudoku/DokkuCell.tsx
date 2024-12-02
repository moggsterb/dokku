'use client';

import React, { useEffect, useState } from 'react';

import { isBrowser } from 'react-device-detect';

import { buildStyle } from '@/lib/helpers';
import {
  Cell,
  CellStatus,
  DisplayMode,
  GridStatus,
  SolveType,
} from '@/lib/types';

import DokkuCandidate from './DokkuCandidate';

import { faSquareFull } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowsLeftRight,
  faArrowsUpDown,
  fa1,
} from '@fortawesome/free-solid-svg-icons';

import styles from './DokkuCell.module.scss';

interface Props {
  cell: Cell;
  gridStatus: GridStatus;
  displayMode: DisplayMode;
  clickHandler?: (value: number) => void;
  setHandler: (cellID: number, value: number) => void;
  methodHandler: (cellID: number, method: SolveType) => void;
  showCandidates: boolean;
  showHints?: boolean;
}

const ICONS = {
  any: { icon: fa1 },
  single: { icon: fa1 },
  block: { icon: faSquareFull },
  column: { icon: faArrowsUpDown },
  row: { icon: faArrowsLeftRight },
};

const DokkuCell = ({
  gridStatus,
  displayMode,
  cell,
  clickHandler,
  setHandler,
  methodHandler,
  showCandidates,
  showHints = false,
}: Props) => {
  const { id, status, value, row, column, candidates } = cell;

  const {
    hasValue,
    isPreset,
    isActive,
    inSelector,
    inConnectedBlock,
    inConnectedColumn,
    inConnectedRow,
    hasFocusedValue,
    inBarredBlock,
    inBarredColumn,
    inBarredRow,
    isBarredX,
    isSolveable,
    isSolveableAny,
    isSolveableBlock,
    isSolveableColumn,
    isSolveableRow,
    isSolveableSingle,
    isCellSingleSolve,
    isCompleteAnim,
    allSolveMethods,
    canActivate,
    activeCellID,
    animateSolve,
  } = cell.cellAnalysis;

  const [animID, setAnimID] = useState<number | undefined>(undefined);

  const isHoverable =
    isBrowser &&
    cell.status !== CellStatus.PRESET &&
    gridStatus === GridStatus.PLAYING;

  const animRequired =
    (value !== undefined || id === activeCellID) &&
    displayMode === DisplayMode.CELL_SINGLE &&
    (inConnectedBlock || inConnectedColumn || inConnectedRow);

  useEffect(() => {
    if (animID !== activeCellID) {
      setAnimID(animRequired ? activeCellID : undefined);
    }
  }, [activeCellID, animID, animRequired]);

  const renderCell = () => {
    if (hasValue) return <span>{value}</span>;
    return (
      <>
        {showHints && renderSolveHints()}
        {(showCandidates || isActive || isSolveable) && renderCandidates()}
      </>
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

  const renderCandidates = () => {
    const highlightSolve = isSolveable && isSolveable.value;
    return (
      <div className={styles.candidates}>
        {candidates.map(({ value, rejected }) => {
          return (
            <DokkuCandidate
              key={`candidate-${cell.id}-${value}`}
              cell={cell}
              value={value}
              rejected={rejected}
              canSolve={highlightSolve === value}
              canSet={
                (isActive && highlightSolve === value) ||
                gridStatus === GridStatus.BUILDING
              }
              animateSolve={animateSolve && highlightSolve === value}
              clickHandler={setHandler}
            />
          );
        })}
      </div>
    );
  };

  const renderBarred = () => {
    return <div className={barredStyle()}>{isBarredX && 'X'}</div>;
  };

  const barredStyle = () => {
    const isBarred = inBarredBlock || inBarredColumn || inBarredRow;
    return buildStyle([
      { style: styles.barred, condition: true },
      { style: styles.barredOn, condition: isBarred },
    ]);
  };

  const cellStyle = () => {
    return buildStyle([
      { style: styles.cell, condition: true },
      { style: styles.inSelector, condition: inSelector },
      { style: styles.topGutter, condition: row === 3 || row === 6 },
      { style: styles.rightGutter, condition: column === 3 || column === 6 },
    ]);
  };

  const innerStyle = () => {
    return buildStyle([
      { style: styles.inner, condition: true },
      { style: styles.preset, condition: isPreset && hasValue },
      { style: styles.hasValue, condition: hasValue },
      { style: styles.active, condition: isActive },
      { style: styles.connectedBlock, condition: inConnectedBlock },
      { style: styles.connectedColumn, condition: inConnectedColumn },
      { style: styles.connectedRow, condition: inConnectedRow },
      { style: styles.focusedValue, condition: hasFocusedValue },
      { style: styles.barredBlock, condition: inBarredBlock },
      { style: styles.barredColumn, condition: inBarredColumn },
      { style: styles.barredRow, condition: inBarredRow },
      { style: styles.solveableAll, condition: isSolveableAny },
      { style: styles.solveableBlock, condition: isSolveableBlock },
      { style: styles.solveableColumn, condition: isSolveableColumn },
      { style: styles.solveableRow, condition: isSolveableRow },
      { style: styles.solveableSingle, condition: isSolveableSingle },
      { style: styles.singleSolve, condition: isCellSingleSolve },
      { style: styles.completeAnimate, condition: isCompleteAnim },
      { style: styles.hoverable, condition: isHoverable },
    ]);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (canActivate && clickHandler) {
      e.stopPropagation();
      clickHandler(id);
    }
  };

  return (
    <div className={cellStyle()}>
      <div className={innerStyle()} onClick={handleClick}>
        {renderBarred()}
        {renderCell()}
      </div>
    </div>
  );
};

export default DokkuCell;
