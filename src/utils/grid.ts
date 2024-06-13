import { isCellSolveable } from "./display";
import { initialEnneads, updateEnneadsCounts } from "./ennead";
import { updateCellCandidates } from "./solving/analysis";
import { findScanningSolves, solveCells } from "./solving/scanning";
import { findSingleSolves } from "./solving/single";
import { ICell, IGrid } from "./types"

export const initialGrid = (startStatus: string, startCells: ICell[]): IGrid => {
  return scanGrid({
    gridStatus: startStatus,
    displayMode: 'standard',
    cells: startCells,
    enneads: initialEnneads(),
    scanningSolves: [],
    singleSolves: [],
    focusCell: undefined,
    focusValue: undefined,
    focusSolveable: false
  })
}

export type GridActions =
  | { type: 'START_PLAYING' }
  | { type: 'UPDATE_MODE', payload: { mode: string; } }
  | { type: 'FOCUS_CELL', payload: { cellID: number } }
  | { type: 'BLUR_CELL' }
  | { type: 'FOCUS_VALUE', payload: { value: number | undefined } }
  | { type: 'SOLVE_CELLS', payload: { cellIDs: number[], value: number } }
  | { type: 'UPDATE_CELL', payload: { cell: ICell } }
  | { type: 'UPDATE_CELLS', payload: { cells: ICell[] } }

export const gridReducer = (state: IGrid, action: GridActions) => {
  console.log({ state })
  switch (action.type) {
    case 'UPDATE_MODE':
      return {
        ...state,
        displayMode: action.payload.mode
      }
    case 'FOCUS_CELL':
      const id = action.payload.cellID;
      const v = state.cells[id].value

      const scanningSolveable = isCellSolveable(state.scanningSolves, id, 'scanning');
      const singleSolveable = isCellSolveable(state.singleSolves, id, 'single');

      // console.log({ id, scanningSolveable, singleSolveable, focus: scanningSolveable || singleSolveable || false })

      const displayMode = v
        ? 'scanning_value'
        : scanningSolveable
          ? 'scanning_solve_cell'
          : singleSolveable
            ? 'singles_solve_cell'
            : 'manual';
      return {
        ...state,
        focusCell: id,
        focusValue: v,
        focusSolveable: scanningSolveable || singleSolveable || false,
        displayMode
      };
    case 'BLUR_CELL':
      return {
        ...state,
        focusValue: undefined,
        focusCell: undefined,
        focusSolveable: false,
        displayMode: 'ready'
      };
    case 'FOCUS_VALUE':
      return {
        ...state,
        focusValue: action.payload.value,
        displayMode: 'scanning_value'
      };
    case 'SOLVE_CELLS':
      return scanGrid({
        ...state,
        cells: solveCells([...state.cells], action.payload.cellIDs, action.payload.value)
      });

    default: return state;
  }
}

const scanGrid = (grid: IGrid) => {
  const cells = updateCellCandidates(grid.cells, 1);
  const enneads = updateEnneadsCounts(grid.enneads, cells);
  const scanningSolves = (findScanningSolves(cells, enneads))
  const singleSolves = (findSingleSolves(cells))
  return {
    ...grid,
    cells,
    enneads,
    scanningSolves,
    singleSolves
  }
}