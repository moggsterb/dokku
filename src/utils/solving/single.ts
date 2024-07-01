import { ICell, ISingleSolveCell } from "../types";

export const findSingleSolves = (cells: ICell[]): ISingleSolveCell[] => {

  return cells.filter((item) => item.status === 'unsolved')
    .map(item => {
      return {
        cellID: item.id,
        candidates: item.candidates.filter(candidate => !candidate.rejected)
      }
    })
    .filter(item => item.candidates.length === 1)
    .map(item => {
      return {
        method: 'single',
        cellID: item.cellID,
        solution: item.candidates[0].value
      }
    })
}