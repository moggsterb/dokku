export type EnneadType = 'block' | 'row' | 'column';

export type Enneads = {
  [key in EnneadType]: Ennead[];
}

interface EnneadValue {
  option: number;
  count: number;
}

export interface Ennead {
  type: EnneadType;
  id: number;
  values: EnneadValue[];
  cellValues: (number | undefined)[];
  taken: number[];
  intersects: {
    [key in EnneadType]: number[]
  }
}
