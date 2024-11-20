
import { cellsInEnnead } from './cell';
import { EnneadType, Ennead, Enneads, Cell } from './types';

export const initialEnneads = (): Enneads => {
  return {
    block: initialEnnead('block'),
    row: initialEnnead('row'),
    column: initialEnnead('column'),
  }
}



export const initialEnnead = (type: EnneadType) => {
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

// 012
// 345
// 678

const getIntersects = (type: EnneadType, id: number) => {
  switch (type) {
    case 'column':
      return {
        block: id < 3 ? [0, 3, 6] : id < 6 ? [1, 4, 7] : [2, 5, 8],
        column: [],
        row: [0, 1, 2, 3, 4, 5, 6, 7, 8],

      }
    case 'row':
      return {
        block: id < 3 ? [0, 1, 2] : id < 6 ? [3, 4, 5] : [6, 7, 8],
        column: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        row: [],
      }
    case 'block':
      return {
        block: [],
        column: [0, 3, 6].includes(id) ? [0, 1, 2] : [1, 4, 7].includes(id) ? [3, 4, 5] : [6, 7, 8],
        row: id < 3 ? [0, 1, 2] : id < 6 ? [3, 4, 5] : [6, 7, 8],

      }
  }
}

export const updateEnneadsCounts = (enneads: Enneads, cells: Cell[]): Enneads => {
  return {
    column: updateEnnead(enneads, 'column', cells),
    block: updateEnnead(enneads, 'block', cells),
    row: updateEnnead(enneads, 'row', cells),
  };
};

export const updateEnnead = (enneads: Enneads, type: EnneadType, cells: Cell[]) => {
  return enneads[type].map((ennead) => {
    const enneadCells = cellsInEnnead(cells, type, ennead.id);
    const cellValues = enneadCells.map(item => item.value)
    const values = ennead.values.map((value) => {
      return {
        ...value,
        count: enneadCells
          .filter((cell) => cell.value === undefined) // unsolved
          .filter((cell) =>
            cell.candidates.find(
              (candidate) => candidate.value === value.option && !candidate.rejected
            )
          ).length,
      };
    })
    const taken = values.filter(item => item.count === 0).map(item => item.option)
    return {
      ...ennead,
      values,
      cellValues,
      taken,
    };
  });
};
