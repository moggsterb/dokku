import { GridActions } from '@/utils/grid';
import { IGrid, SolveType } from '@/utils/types';
import { Dispatch } from 'react';

import styles from './Narrator.module.scss';

interface Props {
  grid: IGrid;
  gridDispatch: Dispatch<GridActions> | undefined;
}

const Narrator = ({
  grid: {
    cells,
    gridStatus,
    focusCellID,
    focusSolveable,
    displayMode,
    solveableByType,
  },
  gridDispatch,
}: Props) => {
  const focusCellObj =
    focusCellID !== undefined ? cells[focusCellID] : undefined;

  const pluralize = (count: number, noun: string) => {
    return `${count} ${noun}${count !== 1 ? 's' : ''}`;
  };

  const getMethod = (type: string) => {
    return type === 'any'
      ? 'any method'
      : type === 'single'
      ? 'the single candidate method'
      : `the ${type} scanning method`;
  };

  const buildMessage = () => {
    switch (displayMode) {
      case 'ready':
        const unsolvedCells = cells.filter(
          (item) => item.status === 'unsolved'
        ).length;

        return (
          <span>
            There are still <em>{`${pluralize(unsolvedCells, 'cell')}`}</em> to
            solve
          </span>
        );

      case 'manual':
        if (!focusCellObj) return;
        const options = focusCellObj.candidates.filter(
          (item) => !item.rejected
        ).length;
        return (
          <span>
            This cell cannot be solved yet but we do know there are{' '}
            <em>{`${pluralize(options, 'option')}`}</em>
          </span>
        );

      case 'all_any':
      case 'all_block':
      case 'all_column':
      case 'all_row':
      case 'all_single':
        const type = displayMode.substring(4) as SolveType;
        const solves = solveableByType[type];
        return (
          <span>
            There are{' '}
            <em className={styles[type]}>{`${pluralize(
              solves.length,
              'cell'
            )}`}</em>{' '}
            which can be solved using{' '}
            <em className={styles[type]}>{getMethod(type)}</em>
          </span>
        );

      case 'cell_block':
      case 'cell_column':
      case 'cell_row':
      case 'cell_single':
        if (!focusSolveable) return;
        return (
          <span>
            Using{' '}
            <em className={styles[focusSolveable.type]}>
              {getMethod(focusSolveable.type)}
            </em>{' '}
            we know this cell must be a <em>{focusSolveable.value}</em>
          </span>
        );

      default:
        return <span>{displayMode}</span>;
    }
  };

  return (
    <div className={styles.wrapper}>
      <p>{buildMessage()}</p>
    </div>
  );
};

export default Narrator;
