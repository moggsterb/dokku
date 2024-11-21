import { cellsInEnnead } from "../cell";
import { EnneadType, Cell, Ennead, Enneads, ScanningSolveCell, CellStatus, SolveType } from "../types";

export const findScanningSolves = (cells: Cell[], enneads: Enneads): ScanningSolveCell[] => {
  const types: EnneadType[] = [EnneadType.BLOCK, EnneadType.COLUMN, EnneadType.ROW];
  const solveables: ScanningSolveCell[] = []
  types.forEach((type) => {
    enneads[type].forEach(ennead => {
      ennead.values.forEach(value => {
        if (value.count === 1) {
          const cell = findCellWithOptionInEnnead(cells, ennead, value.option)
          if (cell) {
            solveables.push({
              method: type as unknown as SolveType,
              enneadID: ennead.id,
              cellID: cell.id,
              solution: value.option,
            })
          }
        }
      });
    });
  });
  return solveables;
}

const findCellWithOptionInEnnead = (cells: Cell[], ennead: Ennead, option: number) => {
  const enneadCells = cellsInEnnead(cells, ennead.type, ennead.id)
  return enneadCells.filter(cell => cell.status === CellStatus.UNSOLVED).find(cell => cell.candidates.filter(candidate => candidate.value === option && !candidate.rejected).length === 1)
}


