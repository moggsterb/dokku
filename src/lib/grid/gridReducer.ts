import { batchSolveCells, initialAnalysis, initialCells, setCells } from "../cell";
import { getDisplayModeForType, isCellSolveable } from "../solving/analyseCells";
import { Cell, SolveType, Grid, GridStatus, DisplayMode, CellStatus, Sequencer, SequenceType } from "../types";
import { analyseGrid } from "../solving/analyseGrid";
import { incSequenceFrame, initialiseSequence, sequencePresets } from "./sequencer";

export type GridActions =
  | { type: 'RESET_GRID' }
  | { type: 'RESTART_GRID' }
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

      const restartedCells = [...state.cells.map(cell => {
        return {
          ...cell,
          value: undefined,
          ...(cell.status !== CellStatus.PRESET && { status: CellStatus.UNSOLVED }),
          candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
            return { value };
          }),
          cellAnalysis: initialAnalysis(
            undefined,
            GridStatus.PLAYING,
            CellStatus.UNSOLVED,
            undefined,
            []
          )
        }
      })]

      return {
        ...state,
        cells: restartedCells,
        gridStatus: GridStatus.ASSEMBLING,
        displayMode: DisplayMode.ASSEMBLE,
        sequencer: initialiseSequence(SequenceType.ASSEMBLE),
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
      const seqType = state.sequencer?.sequenceType
      return {
        ...state,
        ...(state.sequencer?.sequenceType === SequenceType.ASSEMBLE && sequencePresets(state.cells, state.sequencer)),
        ...(seqType === SequenceType.COMPLETE && { sequencer: incSequenceFrame(state.sequencer, 9) }),
        ...(seqType === SequenceType.SINGLE && { sequencer: incSequenceFrame(state.sequencer, 9) }),
        ...(seqType === SequenceType.SCAN && { sequencer: incSequenceFrame(state.sequencer,) }),
      }

    case 'SET_CELL':
      return {
        ...state,
        cells: setCells([...state.cells], [action.payload.cellID], action.payload.value, action.payload.type),
        activeCellID: undefined,
        // displayMode: DisplayMode.READY
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
      const solveable = isCellSolveable(state.solveableCells, id, action.payload.method || SolveType.ANY, 'any')
      const displayMode = solveable ? getDisplayModeForType(solveable.type) : DisplayMode.MANUAL;
      return {
        ...state,
        activeCellID: id,
        displayMode,
        sequencer: initialiseSequence(displayMode, state, id)
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