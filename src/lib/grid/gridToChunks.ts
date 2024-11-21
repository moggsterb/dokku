import { Cell } from "../types";
import gridToString from "./gridToString";

const gridToChunks = (cells: Cell[]) => {
  const str = gridToString(cells);
  return str.match(/.{1,9}/g);
};

export default gridToChunks;