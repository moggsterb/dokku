import { EXAMPLES } from "./examples";
import { EnneadType, ICell, IEnneads, ICandidate, ITrio } from "./types";

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
        value: undefined,
        candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
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
  const data = EXAMPLES.find(item => item.id === id);
  const grid = data?.grid.join('');
  return customCells(grid);
}

export const customCells = (str: string | undefined) => {
  const cells = initialCells();
  if (str) {
    for (let cellID = 0; cellID < str.length; cellID++) {
      if (str[cellID] !== '-') {
        cells[cellID].status = 'preset'
        cells[cellID].value = Number(str[cellID]);
      }
    }
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
    .filter((cell) => cell.status === 'unsolved')
    .filter(
      (cell) =>
        cell.block === trio.block &&
        ((cell.trioColumn === trio.trioColumn &&
          trio.type === 'column') ||
          (cell.trioRow === trio.trioRow && trio.type === 'row'))
    )
}

export const setSolvedByCLO = (cells: ICell[]) => {
  return cells.map((cell) => {
    const solvedByCLO = cell.value === 0 && flagCellsLastCandidate(cell)
    return {
      ...cell,
      ...(solvedByCLO && { solved: solvedByCLO }),
    };
  })
}

export const flagCellsLastCandidate = (cell: ICell) => {
  const available = cell.candidates
    .filter((candidate) => !candidate.rejected)
    .map((candidate) => candidate.value);
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
  // check candidate.value in each of the 3 enneads ... if any are 1 ... we can solve
  const onlyCandidate = cell.candidates
    .filter((candidate) => !candidate.rejected)
    .filter((candidate) => (
      (enneads.column[cell.column].values.find(value => value.option === candidate.value)?.count === 1) ||
      (enneads.row[cell.row].values.find(value => value.option === candidate.value)?.count === 1) ||
      (enneads.block[cell.block].values.find(value => value.option === candidate.value)?.count === 1)
    ))
  return onlyCandidate.length === 1 && { stage: 1, reason: 'vlc', value: onlyCandidate[0].value }
}


export const anythingToSolve = (cells: ICell[]) => {
  return cells.filter(cell => cell.status === 'unsolved').length
}


export const unsolvedCells = (cells: ICell[]) => {
  return cells.filter((cell) => cell.value === 0).length;
};

export const solvedCells = (cells: ICell[]) => {
  return cells.filter((cell) => cell.value !== undefined).length;
};

export const outstandingCellCandidates = (cells: ICell[]) => {
  return cells.filter(cell => cell.value === 0).reduce((total, cell) => { return total + cell.candidates.filter(candidate => !candidate.rejected).length }, 0);
}


