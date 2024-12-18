import React, { Dispatch } from 'react';

import { GridActions } from '@/lib/grid';

import Control from './Control';
import Portal from '../Layout/Portal';

interface Props {
  gridDispatch: Dispatch<GridActions>;
}

const CompleteControls = ({ gridDispatch }: Props) => {
  const replayHandler = () => {
    gridDispatch({ type: 'RESTART_GRID' });
  };

  return (
    <>
      <Portal type='header'>
        <Control
          banner={{
            title: 'Grid Solved',
            description: 'The puzzle is complete',
          }}
        />
      </Portal>
      <Portal type='footer'>
        <Control
          beforeActions={[{ title: 'restart', handler: replayHandler }]}
          afterActions={[{ title: 'play another', url: `/` }]}
        />
      </Portal>
    </>
  );
};

export default CompleteControls;
