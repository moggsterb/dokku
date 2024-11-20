import { customCells } from ".";
import { EXAMPLES } from "../../data/examples";
import { Cell } from "../types";

export const loadCells = (id: number): Cell[] => {
  const data = EXAMPLES.find(item => item.id === id);
  const grid = data?.grid.join('');
  return customCells(grid);
}