import { initialEnneads } from "../ennead";
import { DisplayMode, GridStatus, ICell, IGrid, SolveableCells } from "../types";
import scanGrid from "./scanGrid";

const initialGrid = (startStatus: GridStatus, startCells: ICell[]): IGrid => {
  return scanGrid({
    gridStatus: startStatus,
    displayMode: DisplayMode.READY,
    cells: startCells,
    enneads: initialEnneads(),
    solveableCells: [] as SolveableCells,
    solveableByType: {
      any: [],
      block: [],
      row: [],
      column: [],
      single: []
    },
    focusCellID: undefined,
    activeCellID: undefined,
    focusValue: undefined,
    focusSolveable: false
  })
}

export default initialGrid;