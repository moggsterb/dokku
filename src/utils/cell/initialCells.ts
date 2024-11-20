import { Cell, GridStatus, DisplayMode } from "../types";
import { initialAnalysis } from "./initialAnalysis";

export const initialCells = (): Cell[] => {
  const cells: Cell[] = [];
  [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((row) => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((column) => {
      const blockRow = Math.floor(row / 3);
      const blockColumn = Math.floor(column / 3);
      const trioRow = row - blockRow * 3;
      const trioColumn = column - blockColumn * 3;

      cells.push({
        id: row * 9 + column,
        row,
        column,
        block: blockRow * 3 + blockColumn,
        status: 'unsolved',
        value: undefined,
        candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
          return { value };
        }),
        solution: [],
        trioRow,
        trioColumn,
        cellAnalysis: initialAnalysis(
          undefined,
          GridStatus.READY,
          DisplayMode.READY,
          'unsolved',
          undefined,
          []
        )
      });
    });
  });
  return cells;
};