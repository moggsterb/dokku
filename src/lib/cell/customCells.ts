import { CellStatus } from "../types";
import { initialCells } from "./initialCells";

export const customCells = (str: string | undefined, presetAndLoad: boolean) => {
  const cells = initialCells();
  if (str) {
    const cellsWithValue = Array.from(str)
      .map((value, id) => {
        return { id, value }
      })
      .filter(cell =>
        cell.value !== '-'
      )
    cellsWithValue.forEach(({ id, value }, index) => {
      cells[id].status = CellStatus.PRESET
      cells[id].presetValue = Number(value);
      if (presetAndLoad) {
        cells[id].value = Number(value);
      }
    })
  }
  return cells;
}

