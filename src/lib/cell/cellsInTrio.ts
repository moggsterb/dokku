import { Cell, CellStatus, Trio } from "../types"

// returns a 3 element Cell[] for a given trio
export const cellsInTrio = (cells: Cell[], trio: Trio): Cell[] => {
  return cells
    .filter((cell) => cell.status === CellStatus.UNSOLVED)
    .filter(
      (cell) =>
        cell.block === trio.block &&
        ((cell.trioColumn === trio.trioColumn &&
          trio.type === 'column') ||
          (cell.trioRow === trio.trioRow && trio.type === 'row'))
    )
}