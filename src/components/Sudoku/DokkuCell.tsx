'use client';

import React, { useEffect, useState } from 'react';

import { isBrowser } from 'react-device-detect';

import { buildStyle } from '@/utils/helpers';
import { Cell, GridStatus, SolveType } from '@/utils/types';

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
  cell,
  clickHandler,
  setHandler,
  methodHandler,
  showCandidates,
  showHints = false,
}: Props) => {
  const { id, status, value, row, column, candidates } = cell;

  const {
    focusCellID,
    gridStatus,
    displayMode,
    hasValue,
    isActive,
    inSelector,
    inConnectedBlock,
    inConnectedColumn,
    inConnectedRow,
    outstandingCellIDs,
    hasFocusedValue,
    inBarredBlock,
    inBarredColumn,
    inBarredRow,
    isSolveable,
    isSolveableAny,
    isSolveableBlock,
    isSolveableColumn,
    isSolveableRow,
    isSolveableSingle,
    isCellSingleSolve,
    isComplete,
    allSolveMethods,
    canActivate,
  } = cell.cellAnalysis;

  const [animID, setAnimID] = useState<number | undefined>(undefined);

  const isHoverable =
    isBrowser && cell.status !== 'preset' && gridStatus === GridStatus.READY;

  const animRequired =
    (value !== undefined || id === focusCellID) &&
    displayMode === 'cell_single' &&
    (inConnectedBlock || inConnectedColumn || inConnectedRow);

  useEffect(() => {
    if (animID !== focusCellID) {
      setAnimID(animRequired ? focusCellID : undefined);
    }
  }, [focusCellID, animID, animRequired]);

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
              animStyle={getAnimStyle(
                id === animID && value === highlightSolve ? highlightSolve : 0,
                'pulseBig'
              )}
              canSet={
                (isActive && highlightSolve === value) ||
                gridStatus === GridStatus.BUILDER
              }
              clickHandler={setHandler}
            />
          );
        })}
      </div>
    );
  };

  const renderBarred = () => {
    return (
      <div className={styles.barred}>
        {outstandingCellIDs.includes(cell.id) && 'X'}
      </div>
    );
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
      { style: styles.preset, condition: status === 'preset' },
      { style: styles.singleSolve, condition: isCellSingleSolve },
      { style: styles.complete, condition: isComplete },
      { style: styles.hoverable, condition: isHoverable },
    ]);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (canActivate && clickHandler) {
      e.stopPropagation();
      clickHandler(id);
    }
  };

  const getAnimStyle = (value: number, name: string) => {
    if (isComplete) {
      return {
        animationDelay: `${Number(value - 1)}s`,
      };
    } else if (animID && animID === focusCellID && value) {
      return {
        animationName: name,
        animationDuration: '5s',
        animationIterationCount: 'infinite',
        animationDelay: `${Number(value) / 2}s`,
      };
    } else {
      return {};
    }
  };

  const isBarred = inBarredBlock || inBarredColumn || inBarredRow;

  return (
    <div className={cellStyle()}>
      <div
        className={innerStyle()}
        onClick={handleClick}
        style={getAnimStyle(Number(value), 'pulse')}
      >
        {isBarred && renderBarred()}
        {renderCell()}
      </div>
    </div>
  );
};

export default DokkuCell;
