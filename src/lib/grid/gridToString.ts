import { Cell } from "../types";

const gridToString = (cells: Cell[]) => {
  return cells.map((item) => (item.value ? item.value : '-')).join('');
};

export default gridToString;