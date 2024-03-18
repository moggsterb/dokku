import { examples } from "./examples";
import { EnneadType, ICell, IEnneads, IOption, ITrio } from "./types";


type CellAction = { type: 'UPDATE_CELL', payload: { cell: ICell } };

export const cellReducer = (state: ICell[], action: CellAction) => {
  switch (action.type) {
    case 'UPDATE_CELL':
      const updateCell = action.payload.cell;
      return [
        ...state.slice(0, updateCell.id),
        updateCell,
        ...state.slice(updateCell.id + 1),
      ]
    default:
      return state;
  }

}

export const initialCells = (): ICell[] => {
  const cells: ICell[] = [];
  [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((row) => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((column) => {
      const blockRow = Math.floor(row / 3);
      const blockColumn = Math.floor(column / 3);
      const trioRow = row - blockRow * 3;
      const trioColumn = column - blockColumn * 3;

      cells.push({
        id: row * 9 + column,
        row,
        column,
        block: blockRow * 3 + blockColumn,
        status: 'unsolved',
        value: 0,
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
          return { value };
        }),
        solution: [],
        trioRow,
        trioColumn,
      });
    });
  });
  return cells;
};

export const loadCells = (id: number): ICell[] => {
  const cells = initialCells();
  const data = examples.find(item => item.id === id);
  if (data) {
    data.grid.forEach((row, r) => {
      Array.from(row).forEach((column, c) => {
        if (column !== '-') {
          // const solved = { stage: 0, value: Number(column), reason: 'fix' };
          const cellId = r * 9 + c;
          cells[cellId].status = 'preset'
          cells[cellId].value = Number(column);
        }
      });
    });
  }
  return cells;
}

// returns a 9 element ICell[] for a given Ennead
export const cellsInEnnead = (cells: ICell[], type: EnneadType, id: number): ICell[] => {
  return cells.filter((cell) => cell[type] === id);
};

// returns a 3 element ICell[] for a given trio
export const cellsInTrio = (cells: ICell[], trio: ITrio): ICell[] => {
  return cells
    .filter((cell) => !cell.solved)
    .filter(
      (cell) =>
        cell.block === trio.block &&
        ((cell.trioColumn === trio.trioColumn &&
          trio.type === 'column') ||
          (cell.trioRow === trio.trioRow && trio.type === 'row'))
    )
}

// returns a 81 element ICell[] with options up to date
export const updateCellOptions = (cells: ICell[], stage: number): ICell[] => {
  return cells.map((cell) => {
    return {
      ...cell,
      ...(cell.value === 0 && { options: cellOptions(cells, cell, stage) }),
    };
  });
};

// returns updated IOption[] for a particular cell
const cellOptions = (cells: ICell[], cell: ICell, stage: number): IOption[] => {
  const takenAll = getTakenValues(cells, cell);

  return cell.options.map((option) => {
    const rejected = takenAll.includes(option.value) && !option.rejected
      ? { stage, reason: 'TAKEN' }
      : undefined;
    return {
      ...option,
      ...(rejected && { rejected }),
    };
  });
};

export const getTakenValues = (cells: ICell[], cell: ICell) => {
  const taken = takenCellValues([
    ...cellsInEnnead(cells, 'row', cell.row),
    ...cellsInEnnead(cells, 'column', cell.column),
    ...cellsInEnnead(cells, 'block', cell.block),
  ])
  const uniqueArray = taken.filter((value, index) => taken.indexOf(value) === index);
  return uniqueArray;
}

// returns a number[] of taken values for a given  ICell[]
export const takenCellValues = (cells: ICell[]): number[] => {
  return cells.filter((cell) => cell.value > 0).map((cell) => cell.value);
};

export const setSolvedByCLO = (cells: ICell[]) => {
  return cells.map((cell) => {
    const solvedByCLO = cell.value === 0 && flagCellsLastOption(cell)
    return {
      ...cell,
      ...(solvedByCLO && { solved: solvedByCLO }),
    };
  })
}

export const flagCellsLastOption = (cell: ICell) => {
  const available = cell.options
    .filter((option) => !option.rejected)
    .map((option) => option.value);
  return available.length === 1 && { stage: 1, reason: 'clo', value: available[0] }
}

export const setSolvedByVLC = (cells: ICell[], enneads: IEnneads) => {
  return cells.map((cell) => {
    const solvedByVLC = cell.value === 0 && flagValuesLastCell(cell, enneads)
    return {
      ...cell,
      ...(solvedByVLC && { solved: solvedByVLC }),
    };
  });
};

export const flagValuesLastCell = (cell: ICell, enneads: IEnneads) => {
  // check option.value in each of the 3 enneads ... if any are 1 ... we can solve
  const onlyOption = cell.options
    .filter((option) => !option.rejected)
    .filter((option) => (
      (enneads.column[cell.column].values.find(value => value.option === option.value)?.count === 1) ||
      (enneads.row[cell.row].values.find(value => value.option === option.value)?.count === 1) ||
      (enneads.block[cell.block].values.find(value => value.option === option.value)?.count === 1)
    ))
  return onlyOption.length === 1 && { stage: 1, reason: 'vlc', value: onlyOption[0].value }
}


export const anythingToSolve = (cells: ICell[]) => {
  return cells.filter(cell => cell.value === 0 && cell.solved).length
}


export const unsolvedCells = (cells: ICell[]) => {
  return cells.filter((cell) => cell.value === 0).length;
};

export const solvedCells = (cells: ICell[]) => {
  return cells.filter((cell) => cell.value > 0).length;
};

export const outstandingCellOptions = (cells: ICell[]) => {
  return cells.filter(cell => cell.value === 0).reduce((total, cell) => { return total + cell.options.filter(option => !option.rejected).length }, 0);
}


