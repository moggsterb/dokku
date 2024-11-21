import { Cell, CellStatus, SingleSolveCell, SolveType } from "../types";

export const findSingleSolves = (cells: Cell[]): SingleSolveCell[] => {

  return cells.filter((item) => item.status === CellStatus.UNSOLVED)
    .map(item => {
      return {
        cellID: item.id,
        candidates: item.candidates.filter(candidate => !candidate.rejected)
      }
    })
    .filter(item => item.candidates.length === 1)
    .map(item => {
      return {
        method: SolveType.SINGLE,
        cellID: item.cellID,
        solution: item.candidates[0].value
      }
    })
}