import { ICell, IRejected } from '@/utils/types';

import styles from './Candidate.module.scss';
import { buildStyle } from '@/utils/helpers';

interface Props {
  cell: ICell;
  value: number;
  rejected?: IRejected;
  canSolve: boolean;
}

const Candidate = ({ cell, value, rejected, canSolve }: Props) => {
  const clickHandler = () => {
    // updateCell(id, value, { stage: 0, value, reason: 'man' });
  };

  const candidateStyle = () => {
    return buildStyle([
      { style: styles.candidate, condition: true },
      { style: styles.singleSolve, condition: canSolve },
    ]);
  };

  return (
    <div className={candidateStyle()} onClick={clickHandler}>
      {rejected ? '' : value}
    </div>
  );
};

export default Candidate;
