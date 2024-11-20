import { cellsInEnnead } from "../cell";
import { EnneadType, Candidate, Cell } from "../types";


// returns a 81 element Cell[] with candidates up to date
export const updateCellCandidates = (cells: Cell[], stage: number): Cell[] => {
  return cells.map((cell) => {
    return {
      ...cell,
      ...(cell.value === undefined && { candidates: cellCandidates(cells, cell, stage) }),
    };
  });
};

// returns updated Candidate[] for a particular cell
const cellCandidates = (cells: Cell[], cell: Cell, stage: number): Candidate[] => {
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

export const getTakenValues = (cells: Cell[], cell: Cell) => {
  const taken = takenCellValues([
    ...cellsInEnnead(cells, 'row', cell.row),
    ...cellsInEnnead(cells, 'column', cell.column),
    ...cellsInEnnead(cells, 'block', cell.block),
  ])
  const uniqueArray = taken.filter((value, index) => taken.indexOf(value) === index);
  return uniqueArray;
}

// returns a number[] of taken values for a given  Cell[]
export const takenCellValues = (cells: Cell[]): number[] => {
  return cells.filter((cell) => cell.value !== undefined).map((cell) => cell.value) as number[];
};

export const takenInEnnead = (cells: Cell[], enneadType: EnneadType, id: number, value: number | undefined) => {
  if (value === undefined) return false;
  return takenCellValues(cellsInEnnead(cells, enneadType, id)).includes(value);
}


