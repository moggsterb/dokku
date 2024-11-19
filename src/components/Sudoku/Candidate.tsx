import { isBrowser } from 'react-device-detect';

import { ICell, IRejected } from '@/utils/types';
import { buildStyle } from '@/utils/helpers';

import styles from './Candidate.module.scss';

interface Props {
  cell: ICell;
  value: number;
  rejected?: IRejected;
  canSolve: boolean;
  canSet: boolean;
  clickHandler: (cellID: number, value: number) => void;
  animStyle: Object;
}

const Candidate = ({
  cell,
  value,
  rejected,
  canSolve,
  canSet,
  clickHandler,
  animStyle,
}: Props) => {
  const handleClick = () => {
    if (!rejected) {
      clickHandler(cell.id, value);
    }
  };
  const canClick = (canSet || canSolve) && !rejected;

  const candidateStyle = () => {
    return buildStyle([
      { style: styles.candidate, condition: true },
      { style: styles.solveable, condition: canSolve },
      { style: styles.notRejected, condition: !rejected },
      { style: styles.settable, condition: canSet },
      {
        style: styles.hoverable,
        condition: isBrowser && canClick,
      },
    ]);
  };

  return (
    <div
      className={candidateStyle()}
      onClick={canClick ? handleClick : undefined}
      style={animStyle}
    >
      {rejected ? '' : value}
    </div>
  );
};

export default Candidate;
