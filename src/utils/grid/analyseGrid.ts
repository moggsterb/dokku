
import { analyseCells } from "./analyseCells";
import { updateEnneadsCounts } from "../ennead";
import { updateCellCandidates } from "../solving/analysis";
import { findScanningSolves } from "../solving/scanning";
import { findSingleSolves } from "../solving/single";
import { Grid, Cell, Enneads, SolveableCells, SolveableCellsByType, DisplayMode, GridStatus } from "../types";

export const analyseGrid = (grid: Grid): Grid => {
  const cells = updateCellCandidates(grid.cells, 1);
  const enneads = updateEnneadsCounts(grid.enneads, cells);
  const solveableCells = findSolves(cells, enneads);
  const solveableCellsByType = summariseSolves(solveableCells);

  const analysedCells = analyseCells(
    cells, enneads, grid.gridStatus, grid.displayMode, solveableCells, grid.focusCellID, grid.focusValue, grid.focusSolveable
  )

  const complete = cells.filter((item) => item.status === 'unsolved').length === 0;

  return {
    ...grid,
    ...(complete && { gridStatus: GridStatus.COMPLETE, displayMode: DisplayMode.COMPLETE }),
    cells: analysedCells,
    enneads,
    solveableCells,
    solveableCellsByType
  }
}

const findSolves = (cells: Cell[], enneads: Enneads): SolveableCells => {
  const x = findScanningSolves(cells, enneads);
  const y = findSingleSolves(cells);
  const solves = [
    ...findScanningSolves(cells, enneads),
    ...findSingleSolves(cells)
  ];
  return solves;
}

const summariseSolves = (solveableCells: SolveableCells) => {
  let byType: SolveableCellsByType = {
    any: [],
    block: [],
    row: [],
    column: [],
    single: []
  };
  solveableCells.forEach(({ method, cellID, solution }) => {
    byType[method].push({ cellID, solution });
    if (!byType['any'].find(solve => solve.cellID === cellID)) {
      byType['any'].push({ cellID, solution });
    }
  })

  return byType;
}