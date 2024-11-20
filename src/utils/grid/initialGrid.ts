import { initialEnneads } from "../ennead";
import { DisplayMode, GridStatus, Cell, Grid, SolveableCells } from "../types";
import { analyseGrid } from "./analyseGrid";

const initialGrid = (startStatus: GridStatus, startCells: Cell[]): Grid => {
  return analyseGrid({
    gridStatus: startStatus,
    displayMode: DisplayMode.READY,
    cells: startCells,
    enneads: initialEnneads(),
    solveableCells: [] as SolveableCells,
    solveableCellsByType: {
      any: [],
      block: [],
      row: [],
      column: [],
      single: []
    },
    focusCellID: undefined,
    focusValue: undefined,
    focusSolveable: false
  })
}

export default initialGrid;