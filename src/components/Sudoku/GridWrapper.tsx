'use client';

import React from 'react';

import { DisplayMode, GridStatus, Cell } from '@/lib/types';
import useTicker from '@/lib/hooks/useTicker';

import DokkuGrid from './DokkuGrid';
import Narrator from './Narrator';
import CompleteControls from '../Controls/CompleteControls';
import BuildControls from '../Controls/BuildControls';
import SolveControls from '../Controls/SolveControls';

import styles from './GridWrapper.module.scss';
interface Props {
  initialCells: Cell[];
  initialStatus: GridStatus;
  showCandidates?: boolean;
  showHints?: boolean;
}

const GridWrapper = ({
  initialCells,
  initialStatus,
  showCandidates = false,
  showHints = false,
}: Props) => {
  const { grid, gridDispatch } = useTicker(initialStatus, initialCells);
  const { gridStatus, displayMode, sequencer } = grid;

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
      {(gridStatus === GridStatus.PLAYING ||
        gridStatus === GridStatus.ASSEMBLING) && (
        <>
          <SolveControls grid={grid} gridDispatch={gridDispatch} />
          <Narrator grid={grid} gridDispatch={gridDispatch} />
        </>
      )}
      {gridStatus === GridStatus.COMPLETED && (
        <CompleteControls
          grid={grid}
          gridDispatch={gridDispatch}
          initialCells={initialCells}
        />
      )}
      <DokkuGrid
        grid={grid}
        showCandidates={showCandidates}
        showHints={showHints}
        gridDispatch={gridDispatch}
      />
      {/* <span>
        Grid: {gridStatus}
        <br />
        Display: {displayMode}
        <br />
        Sequencer: {sequencer}
      </span> */}
    </div>
  );
};

export default GridWrapper;
