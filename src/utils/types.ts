export type EnneadType = 'block' | 'row' | 'column';

export type IEnneads = {
  [key in EnneadType]: IEnnead[];
}


export interface IRejected { stage: number; reason: string }

export interface ICandidate {
  value: number;
  rejected?: IRejected;
}

// stage: x, value: y, reason: 'CLO' | 'VLC'
export interface ISolved {
  stage: number;
  value: number;
  reason: string;
}


export interface IScanningSolve { type: EnneadType, enneadId: number, cellID: number, option: number }

export interface ISingleSolve { cellID: number, option: number }


// CELL status

// - 'preset' - cell was set at start
// - 'unsolved' - cell is currently blank
// - 'solved' - cell has been solved

// modifier styles 

// 'edit' mode => i.e. when a cell has been made active

// - activated
// - connected (same ennead as active and unsolved)
// - influencing (same ennead as active and solved/preset)
// - irrelevant

// 'solveable' mode => when there are solveables

// - solveable

// 'solveableFocus' mode => when a solveable has focus

// - solveable
// - connected (ennead intersects focused cell and has a value)
// - influencing (ennead intersects focused cell but doesn't match value)
// - irrelevant


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
  solved?: ISolved;
  solveable?: IScanningSolve;
}



export interface IValue {
  option: number;
  count: number;
}

// an ennead is a 1-9 set (block, row, column) 
// we need to keep track of how many options each value has
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


export type IsSolveable = false | { type: 'scanning' | 'single', value: number, scanType?: EnneadType };
export interface IGrid {
  gridStatus: string;
  displayMode: string;
  cells: ICell[],
  enneads: IEnneads;
  scanningSolves: IScanningSolve[];
  singleSolves: ISingleSolve[];
  focusCell: number | undefined;
  focusValue: number | undefined;
  focusSolveable: IsSolveable;
}