import { ICell } from '@/utils/types';

interface Props {
  cell: ICell;
  isActive: boolean;
  isLit: boolean;
  clickHandler: (value: number) => void;
}

const Cell = ({ cell, isActive, isLit, clickHandler }: Props) => {
  // const canActivate = cell.status !== 'preset';
  const canActivate = true;

  const cellStyle = `cell row-${cell.row} col-${cell.column}`;
  const innerStyle = `cell__inner ${cell.status} ${isActive && 'active'} ${
    isLit && 'lit'
  } ${canActivate && 'can-activate'}`;

  const handleClick = () => {
    if (canActivate) {
      clickHandler(cell.id);
    }
  };

  return (
    <div className={cellStyle}>
      <div className={innerStyle} onClick={handleClick}>
        <span className='cell__value'>{cell.value ? cell.value : ''}</span>
      </div>
    </div>
  );
};

export default Cell;
