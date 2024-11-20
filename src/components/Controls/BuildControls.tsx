'use client';
import React, { Dispatch } from 'react';

import { GridActions, gridToChunks, gridToString } from '@/utils/grid';
import { Grid } from '@/utils/types';

import Control from './Control';
import Portal from '../Layout/Portal';

interface Props {
  grid: Grid;
  gridDispatch: Dispatch<GridActions>;
}

const BuildControls = ({ grid, gridDispatch }: Props) => {
  const resetHandler = () => {
    gridDispatch({ type: 'RESET_GRID' });
  };

  const outputHandler = () => {
    console.log(gridToChunks(grid.cells));
  };

  return (
    <>
      <Portal type='header'>
        <Control
          banner={{
            title: 'Create your own Grid',
            description:
              'Enter your own puzzle and DOKKU will help you solve it',
          }}
        />
      </Portal>
      <Portal type='footer'>
        <Control
          beforeActions={[
            { title: 'reset', handler: resetHandler },
            // { title: 'output', handler: outputHandler },
          ]}
          afterActions={[
            { title: 'solve', url: `/play?custom=${gridToString(grid.cells)}` },
          ]}
        />
      </Portal>
    </>
  );
};

export default BuildControls;
