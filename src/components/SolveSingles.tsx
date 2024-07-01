import { GridActions } from '@/utils/grid';
import { IGrid } from '@/utils/types';
import { Dispatch } from 'react';

import ValueSolver, { IValueSolveCount } from './ValueSolver';
import { onlyUnique } from '@/utils/helpers';

interface Props {
  grid: IGrid;
  gridDispatch: Dispatch<GridActions>;
}

const SolveSingles = ({ grid, gridDispatch }: Props) => {
  const countSolvesForValue = (value: number) => {
    return grid.solveableCells
      .filter((item) => item.method === 'single')
      .filter((item) => item.solution === value)
      .map((item) => item.cellID)
      .filter(onlyUnique)
      .sort();
  };

  const counts: IValueSolveCount[] = [];
  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((value) => {
    counts.push({ value, cellIDs: countSolvesForValue(value) });
  });

  return <ValueSolver counts={counts} gridDispatch={gridDispatch} />;
};

export default SolveSingles;
