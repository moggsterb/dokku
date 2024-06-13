import { GridActions } from '@/utils/grid';
import { Dispatch } from 'react';

import styles from './ValueSolver.module.scss';
import { buildStyle } from '@/utils/helpers';

export interface IValueSolveCount {
  value: number;
  cellIDs: number[];
}

interface Props {
  counts: IValueSolveCount[];
  gridDispatch: Dispatch<GridActions>;
}

const ValueSolver = ({ gridDispatch, counts }: Props) => {
  return (
    <div className={styles.valueSolver}>
      {counts.map((item) => {
        const scannable = item.cellIDs.length;
        const valueStyle = buildStyle([
          { style: styles.value, condition: true },
          { style: styles.active, condition: scannable > 0 },
        ]);

        return (
          <div key={item.value} className={styles.item}>
            <div style={{ height: scannable * 5 }} className={styles.bar} />
            <div
              className={valueStyle}
              onClick={() => {
                if (scannable === 0) return;
                gridDispatch({
                  type: 'SOLVE_CELLS',
                  payload: {
                    cellIDs: item.cellIDs,
                    value: item.value,
                  },
                });
              }}
              onMouseEnter={() => {
                gridDispatch({
                  type: 'FOCUS_VALUE',
                  payload: { value: item.value },
                });
              }}
              onMouseLeave={() => {
                gridDispatch({
                  type: 'FOCUS_VALUE',
                  payload: { value: undefined },
                });
              }}
            >
              {item.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ValueSolver;
