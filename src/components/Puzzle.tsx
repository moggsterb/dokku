'use client';

import { ICell } from '@/utils/types';
import Grid from './Grid';

import useControl from '@/utils/hooks/useControl';
import BuildControls from './BuildControls';
import SolveControls from './SolveControls';

import styles from './Puzzle.module.scss';
import Narrator from './Narrator';
import React from 'react';
import CompleteControls from './CompleteControls';

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
  const { gridStatus, cells, enneads, focusCellID, focusValue } = grid;

  return (
    <div className={styles.wrapper}>
      <Grid
        grid={grid}
        showCandidates={showCandidates}
        showHints={showHints}
        gridDispatch={gridDispatch}
      />
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
    </div>
  );
};

export default Puzzle;
