import { Candidate } from "./candidate";
import { CellStatus, SolveType } from "./enums";
import { IsSolveable } from "./solveable";

export interface CellAnalysis {
  inSelector: boolean,
  canActivate: boolean;
  isComplete: boolean;
  isCompleteAnim: boolean;

  hasValue: boolean;
  isPreset: boolean;
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

  assembleSequenceId: number,

  value: number | undefined;
  presetValue: number | undefined;

  candidates: Candidate[];
  solution: { value: number; method: string }[];
  cellAnalysis: CellAnalysis
}