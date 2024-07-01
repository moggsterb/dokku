import { cellsInEnnead } from "../cell";
import { EnneadType, ICell, IEnnead, IEnneads, IScanningSolveCell } from "../types";


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


// export const doScanning = (incomingCells: ICell[], incomingEnneads: IEnneads) => {
//   const cells = updateCellCandidates(incomingCells, 1);
//   const enneads = updateEnneadsCounts(incomingEnneads, cells);
//   const scanningSolves = (findScanningSolves(cells, enneads))

//   if (scanningSolves.length === 0) return false;

//   scanningSolves.forEach(solveable => {
//     const cellIndex = cells.findIndex(cell => cell.id === solveable.cellID)
//     cells[cellIndex].solveable = solveable;
//   })

//   return cells;
// }

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

// export const setSuspects = (cells: ICell[]) => {
//   cells.forEach(cell => {
//     if (cell.solveable) {
//       cell.value = cell.solveable.option;
//       cell.solveable = undefined;
//       cell.status = 'solved';
//     }
//   })
//   return cells;
// }


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
