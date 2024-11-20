import { Cell, EnneadType } from "../types";

// returns a 9 element Cell[] for a given Ennead
export const cellsInEnnead = (cells: Cell[], type: EnneadType, id: number): Cell[] => {
  return cells.filter((cell) => cell[type] === id);
};