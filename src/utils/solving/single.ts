import { ICell, ISingleSolve } from "../types";

export const findSingleSolves = (cells: ICell[]): ISingleSolve[] => {

  return cells.filter((item) => item.status === 'unsolved')
    .map(item => {
      return {
        cellID: item.id,
        candidates: item.candidates.filter(candidate => !candidate.rejected)
      }
    })
    .filter(item => item.candidates.length === 1)
    .map(item => { return { cellID: item.cellID, option: item.candidates[0].value } })
}