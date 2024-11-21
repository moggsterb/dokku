import { CellStatus } from "../types";
import { initialCells } from "./initialCells";

export const customCells = (str: string | undefined) => {
  const cells = initialCells();
  if (str) {
    for (let cellID = 0; cellID < str.length; cellID++) {
      if (str[cellID] !== '-') {
        cells[cellID].status = CellStatus.PRESET
        cells[cellID].value = Number(str[cellID]);
      }
    }
  }
  return cells;
}