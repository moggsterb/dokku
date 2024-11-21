import { Enneads, EnneadType, Ennead } from "../types";

export const initialEnneads = (): Enneads => {
  return {
    block: initialEnnead(EnneadType.BLOCK),
    row: initialEnnead(EnneadType.ROW),
    column: initialEnnead(EnneadType.COLUMN),
  }
}

const initialEnnead = (type: EnneadType) => {
  const enneads: Ennead[] = [];

  [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((id) => {
    enneads.push({
      id,
      type,
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((option) => {
        return { option, count: 9 };
      }),
      taken: [],
      cellValues: [],
      intersects: getIntersects(type, id)
    });
  });
  return enneads;
};

const getIntersects = (type: EnneadType, id: number) => {
  switch (type) {
    case EnneadType.COLUMN:
      return {
        block: id < 3 ? [0, 3, 6] : id < 6 ? [1, 4, 7] : [2, 5, 8],
        column: [],
        row: [0, 1, 2, 3, 4, 5, 6, 7, 8],

      }
    case EnneadType.ROW:
      return {
        block: id < 3 ? [0, 1, 2] : id < 6 ? [3, 4, 5] : [6, 7, 8],
        column: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        row: [],
      }
    case EnneadType.BLOCK:
      return {
        block: [],
        column: [0, 3, 6].includes(id) ? [0, 1, 2] : [1, 4, 7].includes(id) ? [3, 4, 5] : [6, 7, 8],
        row: id < 3 ? [0, 1, 2] : id < 6 ? [3, 4, 5] : [6, 7, 8],

      }
  }
}