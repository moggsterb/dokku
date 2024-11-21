import { cellsInEnnead } from "../cell";
import { Enneads, Cell, EnneadType } from "../types";

export const updateEnneadsCounts = (enneads: Enneads, cells: Cell[]): Enneads => {
  return {
    column: updateEnnead(enneads, EnneadType.COLUMN, cells),
    block: updateEnnead(enneads, EnneadType.BLOCK, cells),
    row: updateEnnead(enneads, EnneadType.ROW, cells),
  };
};

const updateEnnead = (enneads: Enneads, type: EnneadType, cells: Cell[]) => {
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