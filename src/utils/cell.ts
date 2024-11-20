import { EXAMPLES } from "./examples";
import { EnneadType, Cell, Enneads, Candidate, Trio, DisplayMode, GridStatus, SolveType } from "./types";
import { CellAnalysis } from "./types/cell";

export const initialAnalysis = (
  value: number | undefined,
  gridStatus: GridStatus,
  displayMode: DisplayMode,
  cellStatus: string,
  focusCellID: number | undefined,
  allSolveMethods: SolveType[]
): CellAnalysis => {
  return {
    hasValue: value !== undefined,
    isActive: false,
    inConnectedBlock: false,
    inConnectedColumn: false,
    inConnectedRow: false,
    outstandingCellIDs: [],
    hasFocusedValue: false,
    inBarredBlock: false,
    inBarredColumn: false,
    inBarredRow: false,
    isSolveable: false,
    isComplete: gridStatus === GridStatus.COMPLETE,
    allSolveMethods,
    canActivate: (gridStatus !== GridStatus.PREVIEW && gridStatus !== GridStatus.SELECTOR && cellStatus !== 'preset') || gridStatus === GridStatus.BUILDER,
    focusCellID,
    gridStatus,
    displayMode,
  }
}

export const initialCells = (): Cell[] => {
  const cells: Cell[] = [];
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
        cellAnalysis: initialAnalysis(
          undefined,
          GridStatus.READY,
          DisplayMode.READY,
          'unsolved',
          undefined,
          []
        )
      });
    });
  });
  return cells;
};

export const loadCells = (id: number): Cell[] => {
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

// returns a 9 element Cell[] for a given Ennead
export const cellsInEnnead = (cells: Cell[], type: EnneadType, id: number): Cell[] => {
  return cells.filter((cell) => cell[type] === id);
};

// returns a 3 element Cell[] for a given trio
export const cellsInTrio = (cells: Cell[], trio: Trio): Cell[] => {
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

export const setSolvedByCLO = (cells: Cell[]) => {
  return cells.map((cell) => {
    const solvedByCLO = cell.value === 0 && flagCellsLastCandidate(cell)
    return {
      ...cell,
      ...(solvedByCLO && { solved: solvedByCLO }),
    };
  })
}

export const flagCellsLastCandidate = (cell: Cell) => {
  const available = cell.candidates
    .filter((candidate) => !candidate.rejected)
    .map((candidate) => candidate.value);
  return available.length === 1 && { stage: 1, reason: 'clo', value: available[0] }
}

export const setSolvedByVLC = (cells: Cell[], enneads: Enneads) => {
  return cells.map((cell) => {
    const solvedByVLC = cell.value === 0 && flagValuesLastCell(cell, enneads)
    return {
      ...cell,
      ...(solvedByVLC && { solved: solvedByVLC }),
    };
  });
};

export const flagValuesLastCell = (cell: Cell, enneads: Enneads) => {
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


export const anythingToSolve = (cells: Cell[]) => {
  return cells.filter(cell => cell.status === 'unsolved').length
}


export const unsolvedCells = (cells: Cell[]) => {
  return cells.filter((cell) => cell.value === 0).length;
};

export const solvedCells = (cells: Cell[]) => {
  return cells.filter((cell) => cell.value !== undefined).length;
};

export const outstandingCellCandidates = (cells: Cell[]) => {
  return cells.filter(cell => cell.value === 0).reduce((total, cell) => { return total + cell.candidates.filter(candidate => !candidate.rejected).length }, 0);
}


