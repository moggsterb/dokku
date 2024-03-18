export interface IEnneads {
  block: IEnnead[];
  row: IEnnead[];
  column: IEnnead[];
}

export interface IRejected { stage: number; reason: string }

export interface IOption {
  value: number;
  rejected?: IRejected;
}

// stage: x, value: y, reason: 'CLO' | 'VLC'
export interface ISolved {
  stage: number;
  value: number;
  reason: string;
}

export interface ICell {
  id: number;
  row: number;
  column: number;
  block: number;
  status: 'preset' | 'unsolved' | 'solved'
  value: number;
  options: IOption[];
  solution: { value: number; method: string }[];
  trioRow: number;
  trioColumn: number;
  solved?: ISolved;
}

export type EnneadType = 'block' | 'row' | 'column';

export interface IValue {
  option: number;
  count: number;
}

// an ennead is a 1-9 set (block, row, column) 
// we need to keep track of how many options each value has
export interface IEnnead {
  type: EnneadType;
  id: number;
  values: IValue[]
}

export interface ITrio {
  block: number;
  trioColumn?: number;
  trioRow?: number;
  type: 'column' | 'row';
  options: IOption[];
}