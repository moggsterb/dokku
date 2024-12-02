'use client';

import React, { useReducer } from 'react';

import { DisplayMode, GridStatus, Cell, SequenceType, Grid } from '@/lib/types';
import useTicker from '@/lib/hooks/useTicker';

import DokkuGrid from './DokkuGrid';
import Narrator from './Narrator';
import CompleteControls from '../Controls/CompleteControls';
import BuildControls from '../Controls/BuildControls';
import SolveControls from '../Controls/SolveControls';

import styles from './GridWrapper.module.scss';
interface Props {
  // initialCells: Cell[];
  // initialStatus: GridStatus;
  startGrid: Grid;
  showCandidates?: boolean;
  showHints?: boolean;
}

const GridWrapper = ({
  // initialCells,
  // initialStatus,
  startGrid,
  showCandidates = false,
  showHints = false,
}: Props) => {
  const { grid, gridDispatch } = useTicker(startGrid);
  const { gridStatus, displayMode, sequencer, activeCellID } = grid;

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        if (displayMode !== DisplayMode.READY) {
          gridDispatch({ type: 'BLUR_CELL' });
        }
      }}
    >
      {gridStatus === GridStatus.BUILDING && (
        <BuildControls grid={grid} gridDispatch={gridDispatch} />
      )}

      {gridStatus !== GridStatus.PREVIEWING &&
        gridStatus !== GridStatus.BUILDING && (
          <CompleteControls gridDispatch={gridDispatch} />
        )}

      {(gridStatus === GridStatus.PLAYING ||
        gridStatus === GridStatus.ASSEMBLING) && (
        <>
          <SolveControls grid={grid} gridDispatch={gridDispatch} />
          <Narrator grid={grid} gridDispatch={gridDispatch} />
        </>
      )}

      <DokkuGrid
        grid={grid}
        showCandidates={showCandidates}
        showHints={showHints}
        gridDispatch={gridDispatch}
      />
      <span style={{ display: 'none', position: 'fixed', top: 75, left: 25 }}>
        Grid: {gridStatus}
        <br />
        Display: {displayMode}
        <br />
        ActiveCellID: {activeCellID}
        <br />
        Sequencer: {sequencer?.currentFrame}
        <br />
        Type: {sequencer?.sequenceType}
      </span>
    </div>
  );
};

export default GridWrapper;
