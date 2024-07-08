import { isBrowser } from 'react-device-detect';

import { ICell, IRejected } from '@/utils/types';
import styles from './Candidate.module.scss';
import { buildStyle } from '@/utils/helpers';

interface Props {
  cell: ICell;
  value: number;
  rejected?: IRejected;
  canSolve: boolean;
  canSet: boolean;
  clickHandler: (cellID: number, value: number) => void;
}

const Candidate = ({
  cell,
  value,
  rejected,
  canSolve,
  canSet,
  clickHandler,
}: Props) => {
  const handleClick = () => {
    if (!rejected) {
      clickHandler(cell.id, value);
    }
  };

  const candidateStyle = () => {
    return buildStyle([
      { style: styles.candidate, condition: true },
      { style: styles.solveable, condition: canSolve },
      { style: styles.notRejected, condition: !rejected },
      { style: styles.settable, condition: canSet },
      {
        style: styles.hoverable,
        condition: isBrowser && !rejected && canSet,
      },
    ]);
  };

  return (
    <div
      className={candidateStyle()}
      onClick={canSet && !rejected ? handleClick : undefined}
    >
      {rejected ? '' : value}
    </div>
  );
};

export default Candidate;
