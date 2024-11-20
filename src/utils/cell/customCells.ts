import { initialCells } from "./initialCells";

export const customCells = (str: string | undefined) => {
  const cells = initialCells();
  if (str) {
    for (let cellID = 0; cellID < str.length; cellID++) {
      if (str[cellID] !== '-') {
        cells[cellID].status = 'preset'
        cells[cellID].value = Number(str[cellID]);
      }
    }
  }
  return cells;
}