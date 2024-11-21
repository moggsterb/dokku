import { Cell, CellStatus } from "../types";

export const batchSolveCells = (cells: Cell[], items: { cellID: number, solution: number }[]) => {
  cells.forEach(cell => {
    const findItem = items.find(item => item.cellID === cell.id)
    if (findItem) {
      cell.value = findItem.solution;
      cell.status = CellStatus.SOLVED;
    }
  })
  return cells;
}