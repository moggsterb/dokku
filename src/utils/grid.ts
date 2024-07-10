import { initialCells } from "./cell";
import { isCellSolveable } from "./display";
import { initialEnneads, updateEnneadsCounts } from "./ennead";
import { updateCellCandidates } from "./solving/analysis";
import { batchSolveCells, findScanningSolves, setCells } from "./solving/scanning";
import { findSingleSolves } from "./solving/single";
import { ICell, IEnneads, IGrid, IScanningSolveCell, ISingleSolveCell, IsSolveable, SolveableByType, SolveableCells, SolveType } from "./types"

export const initialGrid = (startStatus: string, startCells: ICell[]): IGrid => {
  return scanGrid({
    gridStatus: startStatus,
    displayMode: 'standard',
    cells: startCells,
    enneads: initialEnneads(),
    solveableCells: [] as SolveableCells,
    solveableByType: {
      all: [],
      block: [],
      row: [],
      column: [],
      single: []
    },
    focusCellID: undefined,
    activeCellID: undefined,
    focusValue: undefined,
    focusSolveable: false
  })
}

export type GridActions =
  | { type: 'RESET_GRID' }
  | { type: 'UPDATE_MODE', payload: { mode: string; } }
  | { type: 'UPDATE_STATUS', payload: { status: string; } }
  | { type: 'SET_CELL', payload: { cellID: number, value: number, type: 'solved' | 'preset' } }
  | { type: 'RESET_CELL', payload: { cellID: number } }
  | { type: 'FOCUS_CELL', payload: { cellID: number, method?: SolveType } }
  | { type: 'BLUR_CELL' }
  | { type: 'FOCUS_VALUE', payload: { value: number | undefined } }
  | { type: 'ACTIVATE_CELL', payload: { cellID: number } }
  | { type: 'SOLVE_CELLS', payload: { cellIDs: number[], value: number } }
  | { type: 'BATCH_SOLVE', payload: { items: { cellID: number, solution: number }[] } }

export const gridReducer = (state: IGrid, action: GridActions) => {

  // console.log('Processing Reducer')

  switch (action.type) {
    case 'RESET_GRID': {
      return scanGrid({
        ...state,
        cells: initialCells()
      })
    }
    case 'UPDATE_MODE':
      return {
        ...state,
        displayMode: action.payload.mode,
        focusValue: undefined,
        focusCellID: undefined,
      }
    case 'UPDATE_STATUS':
      return {
        ...state,
        gridStatus: action.payload.status
      }
    case 'SET_CELL':
      return scanGrid({
        ...state,
        cells: setCells([...state.cells], [action.payload.cellID], action.payload.value, action.payload.type),
        focusValue: undefined,
        focusCellID: undefined,
        focusSolveable: false as IsSolveable,
        displayMode: 'ready'
      });


    case 'RESET_CELL':
      return scanGrid({
        ...state,
        cells: setCells([...state.cells], [action.payload.cellID], undefined, 'unsolved').map(cell => {
          return {
            ...cell,
            candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
              return { value };
            }),
          }
        }),
        focusValue: undefined,
        focusCellID: undefined,
        focusSolveable: false as IsSolveable,
        displayMode: 'ready'
      })

    case 'FOCUS_CELL':
      const id = action.payload.cellID;
      const v = state.cells[id].value
      if (v) {
        return {
          ...state,
          focusCellID: id,
          focusValue: v,
          displayMode: 'scanning_value'
        }
      }
      const solveable = isCellSolveable(state.solveableCells, id, action.payload.method || 'any', 'any')

      const displayMode = !solveable
        ? 'manual'
        : `cell_${solveable.type}`
      // : solveable.type === 'cell_single'
      //   ? 'cell_singles'
      //   : 'scanning_solve_cell'

      return {
        ...state,
        focusCellID: id,
        focusSolveable: solveable,
        displayMode
      };
    case 'BLUR_CELL':
      return {
        ...state,
        focusValue: undefined,
        focusCellID: undefined,
        focusSolveable: false as IsSolveable,
        displayMode: 'ready'
      };
    case 'FOCUS_VALUE':
      return {
        ...state,
        focusValue: action.payload.value,
        displayMode: 'scanning_value'
      };
    case 'ACTIVATE_CELL':
      return {
        ...state,
        activeCellID: action.payload.cellID,
        displayMode: 'active_cell'
      }
    case 'SOLVE_CELLS':
      return scanGrid({
        ...state,
        cells: setCells([...state.cells], action.payload.cellIDs, action.payload.value, 'solved')
      });
    case 'BATCH_SOLVE':
      return scanGrid({
        ...state,
        cells: batchSolveCells([...state.cells], action.payload.items)
      })

    default:
      return state;
  }
}

const scanGrid = (grid: IGrid): IGrid => {
  const cells = updateCellCandidates(grid.cells, 1);
  const enneads = updateEnneadsCounts(grid.enneads, cells);
  const solveableCells = findSolves(cells, enneads);
  const solveableByType = summariseSolves(solveableCells)

  // console.log({ solveableCells })

  return {
    ...grid,
    cells,
    enneads,
    solveableCells,
    solveableByType
  }
}

const findSolves = (cells: ICell[], enneads: IEnneads): SolveableCells => {
  const x = findScanningSolves(cells, enneads);
  const y = findSingleSolves(cells);
  const solves = [
    ...findScanningSolves(cells, enneads),
    ...findSingleSolves(cells)
  ];
  return solves;
}

const summariseSolves = (solveableCells: SolveableCells) => {
  let byType: SolveableByType = {
    all: [],
    block: [],
    row: [],
    column: [],
    single: []
  };
  solveableCells.forEach(({ method, cellID, solution }) => {
    byType[method].push({ cellID, solution });
    if (!byType['all'].find(solve => solve.cellID === cellID)) {
      byType['all'].push({ cellID, solution });
    }
  })

  return byType;
}

export const filterSolveableCells = (solveableCells: SolveableCells, method: string) => {
  return solveableCells
    .filter((cell) => cell.method === method)
    .map(({ cellID, solution }) => {
      return { cellID, solution };
    });
}

export const gridToString = (cells: ICell[]) => {
  return cells.map((item) => (item.value ? item.value : '-')).join('');
};

export const gridToChunks = (cells: ICell[]) => {
  const str = gridToString(cells);
  return str.match(/.{1,9}/g);
};