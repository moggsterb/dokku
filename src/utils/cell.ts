import { ICell } from "./types";


export const initialCells = (): ICell[] => {
  const cells: ICell[] = [];
  [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((row) => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((column) => {
      const blockRow = Math.floor(row / 3);
      const blockColumn = Math.floor(column / 3);
      // const trioRow = row - blockRow * 3;
      // const trioColumn = column - blockColumn * 3;

      cells.push({
        id: row * 9 + column,
        row,
        column,
        block: blockRow * 3 + blockColumn,
        value: 0,
        // options: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
        //   return { value };
        // }),
        // solution: [],
        // trioRow,
        // trioColumn,
      });
    });
  });
  return cells;
};