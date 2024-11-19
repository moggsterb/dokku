'use client';

import React from 'react';

import { DisplayMode, GridStatus, ICell } from '@/utils/types';
import useControl from '@/utils/hooks/useControl';

import Grid from './Grid';
import Narrator from './Narrator';
import CompleteControls from '../Controls/CompleteControls';
import BuildControls from '../Controls/BuildControls';
import SolveControls from '../Controls/SolveControls';

import styles from './GridWrapper.module.scss';
interface Props {
  initialCells: ICell[];
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
  const { grid, gridDispatch } = useControl(initialStatus, initialCells);
  const { gridStatus, displayMode } = grid;

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        if (displayMode !== DisplayMode.READY) {
          gridDispatch({ type: 'BLUR_CELL' });
        }
      }}
    >
      {gridStatus === GridStatus.BUILDER && (
        <BuildControls grid={grid} gridDispatch={gridDispatch} />
      )}
      {(gridStatus === GridStatus.READY || gridStatus === GridStatus.AUTO) && (
        <>
          <SolveControls grid={grid} gridDispatch={gridDispatch} />
          <Narrator grid={grid} gridDispatch={gridDispatch} />
        </>
      )}
      {gridStatus === GridStatus.COMPLETE && (
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

export default GridWrapper;
