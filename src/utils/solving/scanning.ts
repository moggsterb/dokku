import { cellsInEnnead } from "../cell";
import { EnneadType, ICell, IEnnead, IEnneads, IScanningSolveCell } from "../types";

export const findScanningSolves = (cells: ICell[], enneads: IEnneads): IScanningSolveCell[] => {
  const types: EnneadType[] = ['block', 'column', 'row'];
  const solveables: IScanningSolveCell[] = []
  types.forEach((type) => {
    enneads[type].forEach(ennead => {
      ennead.values.forEach(value => {
        if (value.count === 1) {
          const cell = findCellWithOptionInEnnead(cells, ennead, value.option)
          if (cell) {
            solveables.push({
              method: type,
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

const findCellWithOptionInEnnead = (cells: ICell[], ennead: IEnnead, option: number) => {
  const enneadCells = cellsInEnnead(cells, ennead.type, ennead.id)
  return enneadCells.filter(cell => cell.status === 'unsolved').find(cell => cell.candidates.filter(candidate => candidate.value === option && !candidate.rejected).length === 1)
}

export const setCells = (cells: ICell[], cellIDs: number[], value: number | undefined, status: 'solved' | 'preset' | 'unsolved') => {
  cells.forEach(cell => {
    if (cellIDs.includes(cell.id)) {
      cell.value = value;
      cell.status = status;
    }
  })
  return cells;
}

export const batchSolveCells = (cells: ICell[], items: { cellID: number, solution: number }[]) => {
  cells.forEach(cell => {
    const findItem = items.find(item => item.cellID === cell.id)
    if (findItem) {
      cell.value = findItem.solution;
      cell.status = 'solved';
    }
  })
  return cells;
}
