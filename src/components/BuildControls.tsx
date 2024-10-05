'use client';

import { GridActions, gridToChunks, gridToString } from '@/utils/grid';
import { IGrid } from '@/utils/types';
import { Dispatch } from 'react';
import Control from './Control';
import Portal from './Portal';
import React from 'react';

interface Props {
  grid: IGrid;
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
          beforeActions={[{ title: 'reset', handler: resetHandler }]}
          afterActions={[
            { title: 'solve', url: `/play?custom=${gridToString(grid.cells)}` },
          ]}
        />
      </Portal>
    </>
  );
};

export default BuildControls;
