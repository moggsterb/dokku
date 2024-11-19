import { ICell } from "../types";
import gridToString from "./gridToString";

const gridToChunks = (cells: ICell[]) => {
  const str = gridToString(cells);
  return str.match(/.{1,9}/g);
};

export default gridToChunks;