import React, { Dispatch } from 'react';

import { GridActions } from '@/utils/grid';
import { DisplayMode, IGrid, SolveType } from '@/utils/types';

import Portal from '../Layout/Portal';

import styles from './Narrator.module.scss';

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
      ? 'single candidate'
      : `${type} scanning`;
  };

  const buildMessage = () => {
    switch (displayMode) {
      case DisplayMode.READY:
        const unsolvedCells = cells.filter(
          (item) => item.status === 'unsolved'
        ).length;

        return (
          <p className={styles.para}>
            <span>
              There are
              <em>{`${pluralize(unsolvedCells, 'unsolved cell')}`}</em>
            </span>
            <span>
              with
              <em className={styles.any}>
                {solveableByType.any.length} immediately solveable
              </em>
            </span>
          </p>
        );

      case DisplayMode.MANUAL:
        if (!focusCellObj) return;
        const options = focusCellObj.candidates.filter(
          (item) => !item.rejected
        ).length;
        return (
          <p className={styles.para}>
            <span>This cell cannot be solved yet</span>
            <span>
              but we do know there are
              <em>{`${pluralize(options, 'option')}`}</em>
            </span>
          </p>
        );

      case DisplayMode.ALL_ANY:
        const any = solveableByType['any'];
        return (
          <p className={styles.para}>
            <span>
              <em className={styles.any}>{`${pluralize(
                any.length,
                'cell'
              )}`}</em>
              can be
            </span>
            <span>
              <em className={styles.any}>immediately solved</em>
            </span>
          </p>
        );
      case DisplayMode.ALL_BLOCK:
      case DisplayMode.ALL_COLUMN:
      case DisplayMode.ALL_ROW:
      case DisplayMode.ALL_SINGLE:
        const type = displayMode.substring(4) as SolveType;
        const solves = solveableByType[type];
        return (
          <p className={styles.para}>
            <span>
              <em className={styles[type]}>{`${pluralize(
                solves.length,
                'cell'
              )}`}</em>
              can be solved using
            </span>
            <span>
              <em className={styles[type]}>{getMethod(type)}</em>
            </span>
          </p>
        );

      case DisplayMode.CELL_BLOCK:
      case DisplayMode.CELL_COLUMN:
      case DisplayMode.CELL_ROW:
      case DisplayMode.CELL_SINGLE:
        if (!focusSolveable) return;
        return (
          <p className={styles.para}>
            <span>
              Using
              <em className={styles[focusSolveable.type]}>
                {getMethod(focusSolveable.type)}
              </em>
            </span>
            <span>
              we know this cell must be a
              <em className={styles.solve}>{focusSolveable.value}</em>
            </span>
          </p>
        );

      default:
        return <span />;
    }
  };

  return (
    <Portal type='header'>
      <div className={styles.wrapper}>{buildMessage()}</div>
    </Portal>
  );
};

export default Narrator;
