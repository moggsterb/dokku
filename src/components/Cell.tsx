import { ICell } from '@/utils/types';

interface Props {
  cell: ICell;
}

const Cell = ({ cell }: Props) => {
  return (
    <div className={`cell row-${cell.row} col-${cell.column}`}>
      <div className={`cell-inner`}>{cell.id}</div>
    </div>
  );
};

export default Cell;
