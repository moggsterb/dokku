import { ICell, IRejected } from '@/utils/types';

import styles from './Candidate.module.scss';
import { buildStyle } from '@/utils/helpers';

interface Props {
  cell: ICell;
  value: number;
  rejected?: IRejected;
  canSolve: boolean;
  clickHandler: (cellID: number, value: number) => void;
}

const Candidate = ({
  cell,
  value,
  rejected,
  canSolve,
  clickHandler,
}: Props) => {
  const handleClick = () => {
    if (!rejected) {
      clickHandler(cell.id, value);
    }
    // updateCell(id, value, { stage: 0, value, reason: 'man' });
  };

  const candidateStyle = () => {
    return buildStyle([
      { style: styles.candidate, condition: true },
      { style: styles.solveable, condition: canSolve },
      { style: styles.active, condition: !rejected },
    ]);
  };

  return (
    <div className={candidateStyle()} onClick={handleClick}>
      {rejected ? '' : value}
    </div>
  );
};

export default Candidate;
