import { ICell } from "../types";

const gridToString = (cells: ICell[]) => {
  return cells.map((item) => (item.value ? item.value : '-')).join('');
};

export default gridToString;