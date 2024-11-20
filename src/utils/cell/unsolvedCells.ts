import { Cell } from "../types";

export const unsolvedCells = (cells: Cell[]) => {
  return cells.filter((cell) => cell.value === 0).length;
};

