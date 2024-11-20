import { Cell } from "../types";

export const solvedCells = (cells: Cell[]) => {
  return cells.filter((cell) => cell.value !== undefined).length;
};