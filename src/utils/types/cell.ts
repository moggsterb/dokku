import { Candidate } from "./candidate";
import { CellStatus, DisplayMode } from "./enums";
import { IsSolveable, SolveType } from "./solveable";

export interface CellAnalysis {
  inSelector: boolean,
  canActivate: boolean;
  isComplete: boolean;

  hasValue: boolean;
  hasFocusedValue: boolean;
  isActive: boolean;

  inConnectedBlock: boolean;
  inConnectedColumn: boolean;
  inConnectedRow: boolean;

  inBarredBlock: boolean;
  inBarredRow: boolean;
  inBarredColumn: boolean;

  isSolveable: IsSolveable;
  isSolveableAny: boolean;
  isSolveableBlock: boolean;
  isSolveableColumn: boolean;
  isSolveableRow: boolean;
  isSolveableSingle: boolean;
  isCellSingleSolve: boolean;

  allSolveMethods: SolveType[];
  outstandingCellIDs: number[];

  activeCellID: number | undefined;
}

export interface Cell {
  id: number;
  status: CellStatus

  row: number;
  column: number;
  block: number;

  trioRow: number;
  trioColumn: number;

  value: number | undefined;

  candidates: Candidate[];
  solution: { value: number; method: string }[];
  cellAnalysis: CellAnalysis
}