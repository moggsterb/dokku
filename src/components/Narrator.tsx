import { GridActions } from '@/utils/grid';
import { IGrid, SolveType } from '@/utils/types';
import { Dispatch } from 'react';

import styles from './Narrator.module.scss';
import Portal from './Portal';

interface Props {
  grid: IGrid;
  gridDispatch: Dispatch<GridActions> | undefined;
}

const Narrator = ({
  grid: { cells, focusCellID, focusSolveable, displayMode, solveableByType },
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
            There are <em>{`${pluralize(unsolvedCells, 'unsolved cell')}`}</em>{' '}
            with <em>{solveableByType.any.length} immediately solveable</em>
          </span>
        );

      case 'manual':
        if (!focusCellObj) return;
        const options = focusCellObj.candidates.filter(
          (item) => !item.rejected
        ).length;
        return (
          <span>
            This cell cannot be solved yet <br />
            but we do know there are{' '}
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
            <em className={styles[type]}>{`${pluralize(
              solves.length,
              'cell'
            )}`}</em>{' '}
            can be solved
            <br /> using <em className={styles[type]}>{getMethod(type)}</em>
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
            </em>
            <br /> we know this cell must be a <em>{focusSolveable.value}</em>
          </span>
        );

      default:
        return <span />;
    }
  };

  return (
    <Portal type='header'>
      <div className={styles.wrapper}>
        <p>{buildMessage()}</p>
      </div>
    </Portal>
  );
};

export default Narrator;
