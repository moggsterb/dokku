import { updateEnneadsCounts } from "../ennead";
import { updateCellCandidates } from "../solving/analysis";
import { findScanningSolves } from "../solving/scanning";
import { findSingleSolves } from "../solving/single";
import { IGrid, ICell, IEnneads, SolveableCells, SolveableByType, DisplayMode, GridStatus } from "../types";

const scanGrid = (grid: IGrid): IGrid => {
  const cells = updateCellCandidates(grid.cells, 1);
  const enneads = updateEnneadsCounts(grid.enneads, cells);
  const solveableCells = findSolves(cells, enneads);
  const solveableByType = summariseSolves(solveableCells);

  const complete = cells.filter((item) => item.status === 'unsolved').length === 0;

  return {
    ...grid,
    ...(complete && { gridStatus: GridStatus.COMPLETE, displayMode: DisplayMode.COMPLETE }),
    cells,
    enneads,
    solveableCells,
    solveableByType
  }
}

const findSolves = (cells: ICell[], enneads: IEnneads): SolveableCells => {
  const x = findScanningSolves(cells, enneads);
  const y = findSingleSolves(cells);
  const solves = [
    ...findScanningSolves(cells, enneads),
    ...findSingleSolves(cells)
  ];
  return solves;
}

const summariseSolves = (solveableCells: SolveableCells) => {
  let byType: SolveableByType = {
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

export default scanGrid;