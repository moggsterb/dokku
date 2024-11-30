import { batchSolveCells, initialCells, setCells } from "../cell";
import { getDisplayModeForType, isCellSolveable } from "../solving/analyseCells";
import { Cell, SolveType, Grid, GridStatus, DisplayMode, CellStatus } from "../types";
import { analyseGrid } from "../solving/analyseGrid";
import { act } from "react-dom/test-utils";

export type GridActions =
  | { type: 'RESET_GRID' }
  | { type: 'RESTART_GRID', payload: { cells: Cell[] } }
  | { type: 'UPDATE_MODE', payload: { mode: DisplayMode; } }
  | { type: 'UPDATE_STATUS', payload: { status: GridStatus; } }
  | { type: 'INC_SEQUENCER' }
  | { type: 'SET_CELL', payload: { cellID: number, value: number, type: CellStatus.SOLVED | CellStatus.PRESET } }
  | { type: 'RESET_CELL', payload: { cellID: number } }
  | { type: 'FOCUS_CELL', payload: { cellID: number, method?: SolveType } }
  | { type: 'BLUR_CELL' }
  | { type: 'SOLVE_CELLS', payload: { cellIDs: number[], value: number } }
  | { type: 'BATCH_SOLVE', payload: { items: { cellID: number, solution: number }[] } }

export const gridReducer = (state: Grid, action: GridActions) => {
  return analyseGrid(updateState(state, action))
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
        gridStatus: GridStatus.ASSEMBLING
      }
    }
    case 'UPDATE_MODE':
      return {
        ...state,
        displayMode: action.payload.mode,
        focusValue: undefined,
        activeCellID: undefined,
      }
    case 'UPDATE_STATUS':
      return {
        ...state,
        gridStatus: action.payload.status
      }
    case 'INC_SEQUENCER':
      const sequencer = (state.sequencer || 0) + 1;
      const unRevealedPresets = state.cells.filter(cell => (cell.status === CellStatus.PRESET && cell.value === undefined))
      const sequenceComplete = unRevealedPresets.length === 0
      if (sequenceComplete) {
        return {
          ...state,
          sequencer: undefined,
          displayMode: DisplayMode.READY,
          gridStatus: GridStatus.PLAYING,

        }
      }
      const revealCell = unRevealedPresets[Math.floor(Math.random() * unRevealedPresets.length)]
      return {
        ...state,
        cells: setCells([...state.cells], [revealCell.id], revealCell.presetValue, CellStatus.PRESET),
        sequencer,
      }

    case 'SET_CELL':
      return {
        ...state,
        cells: setCells([...state.cells], [action.payload.cellID], action.payload.value, action.payload.type),
        activeCellID: undefined,
        displayMode: DisplayMode.READY
      };
    case 'RESET_CELL':
      return {
        ...state,
        cells: setCells([...state.cells], [action.payload.cellID], undefined, CellStatus.UNSOLVED).map(cell => {
          return {
            ...cell,
            candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
              return { value };
            }),
          }
        }),
        activeCellID: undefined,
        displayMode: DisplayMode.READY
      }

    case 'FOCUS_CELL':
      const id = action.payload.cellID;
      const v = state.cells[id].value
      if (v) {
        return {
          ...state,
          activeCellID: id,
          displayMode: DisplayMode.SCANNING_VALUE
        }
      }
      const solveable = isCellSolveable(state.solveableCells, id, action.payload.method || SolveType.ANY, 'any')
      const displayMode = solveable ? getDisplayModeForType(solveable.type) : DisplayMode.MANUAL;

      return {
        ...state,
        activeCellID: id,
        displayMode
      };
    case 'BLUR_CELL':
      return {
        ...state,
        activeCellID: undefined,
        displayMode: DisplayMode.READY
      };
    case 'SOLVE_CELLS':
      return {
        ...state,
        cells: setCells([...state.cells], action.payload.cellIDs, action.payload.value, CellStatus.SOLVED)
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