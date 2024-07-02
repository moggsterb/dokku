import { initialCells } from "./cell";
import { isCellSolveable } from "./display";
import { initialEnneads, updateEnneadsCounts } from "./ennead";
import { updateCellCandidates } from "./solving/analysis";
import { batchSolveCells, findScanningSolves, setCells } from "./solving/scanning";
import { findSingleSolves } from "./solving/single";
import { ICell, IEnneads, IGrid, IScanningSolveCell, ISingleSolveCell, IsSolveable, SolveableCells } from "./types"

export const initialGrid = (startStatus: string, startCells: ICell[]): IGrid => {
  return scanGrid({
    gridStatus: startStatus,
    displayMode: 'standard',
    cells: startCells,
    enneads: initialEnneads(),
    solveableCells: [] as SolveableCells,
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
  | { type: 'FOCUS_CELL', payload: { cellID: number } }
  | { type: 'BLUR_CELL' }
  | { type: 'FOCUS_VALUE', payload: { value: number | undefined } }
  | { type: 'ACTIVATE_CELL', payload: { cellID: number } }
  | { type: 'SOLVE_CELLS', payload: { cellIDs: number[], value: number } }
  | { type: 'BATCH_SOLVE', payload: { items: { cellID: number, solution: number }[] } }

export const gridReducer = (state: IGrid, action: GridActions) => {
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
        displayMode: action.payload.mode
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
      const solveable = isCellSolveable(state.solveableCells, id, 'any', 'any')

      const displayMode = !solveable
        ? 'manual'
        : solveable.type === 'single'
          ? 'singles_solve_cell'
          : 'scanning_solve_cell'

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
  const solveableCells = findSolveableCells(cells, enneads);

  return {
    ...grid,
    cells,
    enneads,
    // solveableCells,
  }
}

const findSolveableCells = (cells: ICell[], enneads: IEnneads): SolveableCells => {
  const scanningSolves: IScanningSolveCell[] = findScanningSolves(cells, enneads);
  const singleSolves: ISingleSolveCell[] = findSingleSolves(cells);

  return [
    ...scanningSolves,
    ...singleSolves
  ];
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