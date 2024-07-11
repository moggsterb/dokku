import { GridActions, gridToChunks, gridToString } from '@/utils/grid';
import { IGrid } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { Dispatch } from 'react';

import styles from './Control.module.scss';

interface Props {
  grid: IGrid;
  gridDispatch: Dispatch<GridActions>;
}

const ControlBuilder = ({ grid, gridDispatch }: Props) => {
  const router = useRouter();

  const backHandler = () => {
    router.push('/');
  };

  const resetHandler = () => {
    gridDispatch({ type: 'RESET_GRID' });
  };

  const outputHandler = () => {
    console.log(gridToChunks(grid.cells));
  };

  const startHandler = () => {
    router.push(`/play?custom=${gridToString(grid.cells)}`);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={backHandler}>cancel</button>
      <button onClick={resetHandler}>reset</button>
      {/* <button onClick={outputHandler}>output</button> */}
      <button onClick={startHandler}>start</button>
    </div>
  );
};

export default ControlBuilder;
