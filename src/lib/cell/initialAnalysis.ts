import { GridStatus, DisplayMode, SolveType, CellStatus } from "../types"
import { CellAnalysis } from "../types/cell"

export const initialAnalysis = (
  value: number | undefined,
  gridStatus: GridStatus,
  cellStatus: string,
  activeCellID: number | undefined,
  allSolveMethods: SolveType[]
): CellAnalysis => {
  return {
    inSelector: gridStatus === GridStatus.SELECTING,
    canActivate: (gridStatus !== GridStatus.PREVIEWING && gridStatus !== GridStatus.SELECTING && cellStatus !== CellStatus.PRESET) || gridStatus === GridStatus.BUILDING,
    isComplete: gridStatus === GridStatus.COMPLETED,

    hasValue: value !== undefined,
    isPreset: cellStatus === CellStatus.PRESET,
    hasFocusedValue: false,
    isActive: false,

    inConnectedBlock: false,
    inConnectedColumn: false,
    inConnectedRow: false,

    inBarredBlock: false,
    inBarredColumn: false,
    inBarredRow: false,

    isSolveable: false,
    isSolveableAny: false,
    isSolveableBlock: false,
    isSolveableColumn: false,
    isSolveableRow: false,
    isSolveableSingle: false,
    isCellSingleSolve: false,

    allSolveMethods,
    outstandingCellIDs: [],

    activeCellID,
  }
}