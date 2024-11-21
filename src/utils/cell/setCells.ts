import { Cell, CellStatus } from "../types";

export const setCells = (cells: Cell[], cellIDs: number[], value: number | undefined, status: CellStatus) => {
  cells.forEach(cell => {
    if (cellIDs.includes(cell.id)) {
      cell.value = value;
      cell.status = status;
    }
  })
  return cells;
}