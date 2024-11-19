import React, { Dispatch } from 'react';

import { GridActions } from '@/utils/grid';
import { ICell, IGrid } from '@/utils/types';

import Control from './Control';
import Portal from '../Layout/Portal';

interface Props {
  grid: IGrid;
  gridDispatch: Dispatch<GridActions>;
  initialCells: ICell[];
}

const CompleteControls = ({ grid, gridDispatch, initialCells }: Props) => {
  const replayHandler = () => {
    gridDispatch({ type: 'RESTART_GRID', payload: { cells: initialCells } });
  };

  return (
    <>
      <Portal type='header'>
        <Control banner={{ title: 'Grid Complete', description: 'All done' }} />
      </Portal>
      <Portal type='footer'>
        <Control
          beforeActions={[{ title: 'replay', handler: replayHandler }]}
          afterActions={[{ title: 'play another', url: `/` }]}
        />
      </Portal>
    </>
  );
};

export default CompleteControls;
