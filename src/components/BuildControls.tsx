import { GridActions, gridToChunks, gridToString } from '@/utils/grid';
import { IGrid } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { Dispatch } from 'react';

import styles from './Control.module.scss';
import Control from './Control';

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
    <Control
      beforeActions={[{ title: 'reset', handler: resetHandler }]}
      afterActions={[
        { title: 'solve', url: `/play?custom=${gridToString(grid.cells)}` },
      ]}
    />
  );
};

export default BuildControls;
