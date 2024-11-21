import { EnneadType, SolveType } from "./enums";

interface SolveableCellBase {
  cellID: number,
  solution: number,
}

export interface ScanningSolveCell extends SolveableCellBase {
  method: SolveType;
  enneadID: number;
}

export interface SingleSolveCell extends SolveableCellBase {
  method: SolveType.SINGLE;
}

export type SolveableCells = (ScanningSolveCell | SingleSolveCell)[]


export type SolveableCellsByType = {
  [key in SolveType]: { cellID: number, solution: number }[]
}

export type IsSolveable = false | { type: SolveType, value: number, scanEnneadType?: EnneadType };