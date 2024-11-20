import { Candidate } from "./candidate";
import { DisplayMode } from "./enums";
import { IsSolveable, SolveType } from "./solveable";

export interface CellAnalysis {
  id?: number,
  inSelector: boolean,
  hasValue: boolean;
  isActive: boolean;

  inConnectedBlock: boolean;
  inConnectedColumn: boolean;
  inConnectedRow: boolean;

  hasFocusedValue: boolean;

  inBarredBlock: boolean;
  inBarredRow: boolean;
  inBarredColumn: boolean;

  canActivate: boolean;
  outstandingCellIDs: number[];

  isComplete: boolean;

  isSolveable: IsSolveable;
  isSolveableAny: boolean;
  isSolveableBlock: boolean;
  isSolveableColumn: boolean;
  isSolveableRow: boolean;
  isSolveableSingle: boolean;
  isCellSingleSolve: boolean;

  allSolveMethods: SolveType[];

  activeCellID: number | undefined;
  gridStatus: string;
  displayMode: DisplayMode;
}

export interface Cell {
  id: number;
  row: number;
  column: number;
  block: number;
  status: 'preset' | 'unsolved' | 'solved'
  value: number | undefined;
  candidates: Candidate[];
  solution: { value: number; method: string }[];
  trioRow: number;
  trioColumn: number;

  cellAnalysis: CellAnalysis
}