import { isBrowser } from 'react-device-detect';

import { Cell, Rejected } from '@/lib/types';
import { buildStyle } from '@/lib/helpers';

import styles from './DokkuCandidate.module.scss';

interface Props {
  cell: Cell;
  value: number;
  rejected?: Rejected;
  canSolve: boolean;
  canSet: boolean;
  clickHandler: (cellID: number, value: number) => void;
  animStyle: Object;
}

const DokkuCandidate = ({
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

export default DokkuCandidate;
