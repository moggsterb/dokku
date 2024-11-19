'use client';

import React from 'react';

import { ICell } from '@/utils/types';
import useControl from '@/utils/hooks/useControl';

import Grid from './Grid';
import Narrator from './Narrator';
import CompleteControls from '../Controls/CompleteControls';
import BuildControls from '../Controls/BuildControls';
import SolveControls from '../Controls/SolveControls';

import styles from './Puzzle.module.scss';
interface Props {
  initialCells: ICell[];
  initialStatus: string; // builder, preview, play
  showCandidates?: boolean;
  showHints?: boolean;
}

const Puzzle = ({
  initialCells,
  initialStatus,
  showCandidates = false,
  showHints = false,
}: Props) => {
  const { grid, gridDispatch } = useControl(initialStatus, initialCells);
  const { gridStatus, displayMode } = grid;

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        if (displayMode !== 'ready') {
          gridDispatch({ type: 'BLUR_CELL' });
        }
      }}
    >
      {gridStatus === 'builder' && (
        <BuildControls grid={grid} gridDispatch={gridDispatch} />
      )}
      {(gridStatus === 'ready' || gridStatus === 'auto') && (
        <>
          <SolveControls grid={grid} gridDispatch={gridDispatch} />
          <Narrator grid={grid} gridDispatch={gridDispatch} />
        </>
      )}
      {gridStatus === 'complete' && (
        <CompleteControls
          grid={grid}
          gridDispatch={gridDispatch}
          initialCells={initialCells}
        />
      )}
      <Grid
        grid={grid}
        showCandidates={showCandidates}
        showHints={showHints}
        gridDispatch={gridDispatch}
      />
    </div>
  );
};

export default Puzzle;
