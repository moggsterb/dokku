import { Candidate } from "./candidate";
import { DisplayMode } from "./enums";
import { IsSolveable, SolveType } from "./solveable";

export interface CellAnalysis {
  id?: number,
  hasValue: boolean;
  isActive: boolean;
  inConnectedBlock: boolean;
  inConnectedColumn: boolean;
  inConnectedRow: boolean;
  canActivate: boolean;
  outstandingCellIDs: number[];

  isComplete: boolean;

  hasFocusedValue: boolean;
  inBarredBlock: boolean;
  inBarredRow: boolean;
  inBarredColumn: boolean;
  isSolveable: IsSolveable;
  allSolveMethods: SolveType[];

  focusCellID: number | undefined;
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