import { EnneadType } from "./ennead";

interface SolveableCellBase {
  cellID: number,
  solution: number,
}

export interface ScanningSolveCell extends SolveableCellBase {
  method: EnneadType;
  enneadID: number;
}

export interface SingleSolveCell extends SolveableCellBase {
  method: 'single';
}

export type SolveableCells = (ScanningSolveCell | SingleSolveCell)[]

export type SolveType = EnneadType | 'single' | 'any';
export type SolveableCellsByType = {
  [key in SolveType]: { cellID: number, solution: number }[]
}

export type IsSolveable = false | { type: SolveType, value: number, scanEnneadType?: EnneadType };