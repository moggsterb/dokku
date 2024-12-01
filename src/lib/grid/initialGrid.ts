import { initialEnneads } from "../ennead";
import { DisplayMode, GridStatus, Cell, Grid, SolveableCells, Sequencer } from "../types";
import { analyseGrid } from "../solving/analyseGrid";

const initialGrid = (
  gridStatus: GridStatus,
  displayMode: DisplayMode,
  sequencer: Sequencer,
  startCells: Cell[]
): Grid => {
  return analyseGrid({
    gridStatus,
    displayMode,
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
    activeCellID: undefined,
    sequencer
  })
}

export default initialGrid;