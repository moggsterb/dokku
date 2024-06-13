import { cellsInEnnead } from "../cell";
import { updateEnneadsCounts } from "../ennead";
import { EnneadType, ICell, IEnnead, IEnneads, IScanningSolve } from "../types";
import { updateCellCandidates } from "./analysis";

// cell display types

// .solveable : the cell we are going to solve (green)
// .influencer-block, .influencer-row, .influencer-column if the cell is in the same ennead
// .blocker if the cell contains the value we're solving
// .irrelevant - if we're not interested in the cell


// - eliminateCandidates
// - countEnneads
// - find any Ennead (e) with a value (v) count = 1
//        if none return false
// - set all displayState (ds) to .irrelevant
// - locate the cell (c) in (e) where the candidates remaining include v 
// - set c.ds = 'solveable'
// - get the intersecting enneads' (ie) (ie. if e is a block, get its rows and columns, if e is a row, get its columns and blocks)
// - if these es contain a solved v ... mark 1) the cells as influencers, 2) the celll containing v) as a blocker


export const doScanning = (incomingCells: ICell[], incomingEnneads: IEnneads) => {
  const cells = updateCellCandidates(incomingCells, 1);
  const enneads = updateEnneadsCounts(incomingEnneads, cells);
  const scanningSolves = (findScanningSolves(cells, enneads))

  if (scanningSolves.length === 0) return false;

  scanningSolves.forEach(solveable => {
    const cellIndex = cells.findIndex(cell => cell.id === solveable.cellID)
    cells[cellIndex].solveable = solveable;
  })

  return cells;
}

export const findScanningSolves = (cells: ICell[], enneads: IEnneads): IScanningSolve[] => {
  const types: EnneadType[] = ['block', 'column', 'row'];
  const solveables: IScanningSolve[] = []
  types.forEach((type) => {
    enneads[type].forEach(ennead => {
      ennead.values.forEach(value => {
        if (value.count === 1) {
          const cell = findCellWithOptionInEnnead(cells, ennead, value.option)
          if (cell) {
            solveables.push({ type, enneadId: ennead.id, option: value.option, cellID: cell.id })
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

export const setSuspects = (cells: ICell[]) => {
  cells.forEach(cell => {
    if (cell.solveable) {
      cell.value = cell.solveable.option;
      cell.solveable = undefined;
      cell.status = 'solved';
    }
  })
  return cells;
}

export const solveCells = (cells: ICell[], cellIDs: number[], value: number) => {
  cells.forEach(cell => {
    if (cellIDs.includes(cell.id)) {
      cell.value = value;
      cell.status = 'solved';
    }
  })
  return cells;
}