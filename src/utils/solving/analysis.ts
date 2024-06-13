import { cellsInEnnead } from "../cell";
import { EnneadType, ICandidate, ICell } from "../types";


// returns a 81 element ICell[] with candidates up to date
export const updateCellCandidates = (cells: ICell[], stage: number): ICell[] => {
  return cells.map((cell) => {
    return {
      ...cell,
      ...(cell.value === undefined && { candidates: cellCandidates(cells, cell, stage) }),
    };
  });
};

// returns updated ICandidate[] for a particular cell
const cellCandidates = (cells: ICell[], cell: ICell, stage: number): ICandidate[] => {
  const takenAll = getTakenValues(cells, cell);

  return cell.candidates.map((candidate) => {
    const rejected = takenAll.includes(candidate.value) && !candidate.rejected
      ? { stage, reason: 'TAKEN' }
      : undefined;
    return {
      ...candidate,
      ...(rejected && { rejected }),
    };
  });
};

export const getTakenValues = (cells: ICell[], cell: ICell) => {
  const taken = takenCellValues([
    ...cellsInEnnead(cells, 'row', cell.row),
    ...cellsInEnnead(cells, 'column', cell.column),
    ...cellsInEnnead(cells, 'block', cell.block),
  ])
  const uniqueArray = taken.filter((value, index) => taken.indexOf(value) === index);
  return uniqueArray;
}

// returns a number[] of taken values for a given  ICell[]
export const takenCellValues = (cells: ICell[]): number[] => {
  return cells.filter((cell) => cell.value !== undefined).map((cell) => cell.value) as number[];
};

export const takenInEnnead = (cells: ICell[], enneadType: EnneadType, id: number, value: number | undefined) => {
  if (value === undefined) return false;
  return takenCellValues(cellsInEnnead(cells, enneadType, id)).includes(value);
}


