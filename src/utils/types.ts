export type EnneadType = 'block' | 'row' | 'column';

export type IEnneads = {
  [key in EnneadType]: IEnnead[];
}


export interface IRejected { stage: number; reason: string }

export interface ICandidate {
  value: number;
  rejected?: IRejected;
}

export interface ISolveableCellBase {
  cellID: number,
  solution: number,
}

export interface IScanningSolveCell extends ISolveableCellBase {
  method: EnneadType;
  enneadID: number;
}

export interface ISingleSolveCell extends ISolveableCellBase {
  method: 'single';
}

export type SolveableCells = (IScanningSolveCell | ISingleSolveCell)[]
export interface ICell {
  id: number;
  row: number;
  column: number;
  block: number;
  status: 'preset' | 'unsolved' | 'solved'
  value: number | undefined;
  candidates: ICandidate[];
  solution: { value: number; method: string }[];
  trioRow: number;
  trioColumn: number;
}

export interface IValue {
  option: number;
  count: number;
}

export interface IEnnead {
  type: EnneadType;
  id: number;
  values: IValue[];
  cellValues: (number | undefined)[];
  taken: number[];
  intersects: {
    [key in EnneadType]: number[]
  }
}

export interface ITrio {
  block: number;
  trioColumn?: number;
  trioRow?: number;
  type: 'column' | 'row';
  candidates: ICandidate[];
}

export type SolveType = EnneadType | 'single' | 'all';
export type SolveableByType = {
  [key in SolveType]: { cellID: number, solution: number }[]
}

export type IsSolveable = false | { type: SolveType, value: number, scanEnneadType?: EnneadType };

export interface IGrid {
  gridStatus: string;
  displayMode: string;
  cells: ICell[],
  enneads: IEnneads;
  solveableCells: SolveableCells;
  solveableByType: SolveableByType;
  focusCellID: number | undefined;
  focusValue: number | undefined;
  focusSolveable: IsSolveable;
  activeCellID: number | undefined;
}