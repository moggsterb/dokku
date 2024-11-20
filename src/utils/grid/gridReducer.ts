import { initialCells } from "../cell";
import { getDisplayModeForType, isCellSolveable } from "../display/analyseCells";
import { setCells, batchSolveCells } from "../solving/scanning";
import { Cell, SolveType, Grid, IsSolveable, GridStatus, DisplayMode } from "../types";
import scanGrid from "./scanGrid";

export type GridActions =
  | { type: 'RESET_GRID' }
  | { type: 'RESTART_GRID', payload: { cells: Cell[] } }
  | { type: 'UPDATE_MODE', payload: { mode: DisplayMode; } }
  | { type: 'UPDATE_STATUS', payload: { status: GridStatus; } }
  | { type: 'SET_CELL', payload: { cellID: number, value: number, type: 'solved' | 'preset' } }
  | { type: 'RESET_CELL', payload: { cellID: number } }
  | { type: 'FOCUS_CELL', payload: { cellID: number, method?: SolveType } }
  | { type: 'BLUR_CELL' }
  | { type: 'FOCUS_VALUE', payload: { value: number | undefined } }
  // | { type: 'ACTIVATE_CELL', payload: { cellID: number } }
  | { type: 'SOLVE_CELLS', payload: { cellIDs: number[], value: number } }
  | { type: 'BATCH_SOLVE', payload: { items: { cellID: number, solution: number }[] } }

export const gridReducer = (state: Grid, action: GridActions) => {
  return scanGrid(updateState(state, action))
}

export const updateState = (state: Grid, action: GridActions) => {
  switch (action.type) {
    case 'RESET_GRID': {
      return {
        ...state,
        cells: initialCells()
      }
    }
    case 'RESTART_GRID': {
      return {
        ...state,
        cells: [...action.payload.cells],
        gridStatus: GridStatus.AUTO
      }
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
      return {
        ...state,
        cells: setCells([...state.cells], [action.payload.cellID], action.payload.value, action.payload.type),
        focusValue: undefined,
        focusCellID: undefined,
        focusSolveable: false as IsSolveable,
        displayMode: DisplayMode.READY
      };
    case 'RESET_CELL':
      return {
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
        displayMode: DisplayMode.READY
      }

    case 'FOCUS_CELL':
      const id = action.payload.cellID;
      const v = state.cells[id].value
      if (v) {
        return {
          ...state,
          focusCellID: id,
          focusValue: v,
          displayMode: DisplayMode.SCANNING_VALUE
        }
      }
      const solveable = isCellSolveable(state.solveableCells, id, action.payload.method || 'any', 'any')
      const displayMode = solveable ? getDisplayModeForType(solveable.type) : DisplayMode.MANUAL;

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
        displayMode: DisplayMode.READY
      };
    case 'FOCUS_VALUE':
      return {
        ...state,
        focusValue: action.payload.value,
        displayMode: DisplayMode.SCANNING_VALUE
      };

    case 'SOLVE_CELLS':
      return {
        ...state,
        cells: setCells([...state.cells], action.payload.cellIDs, action.payload.value, 'solved')
      };
    case 'BATCH_SOLVE':
      return {
        ...state,
        cells: batchSolveCells([...state.cells], action.payload.items)
      }

    default:
      return state;
  }
}

export default gridReducer;