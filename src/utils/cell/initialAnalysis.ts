import { GridStatus, DisplayMode, SolveType } from "../types"
import { CellAnalysis } from "../types/cell"

export const initialAnalysis = (
  value: number | undefined,
  gridStatus: GridStatus,
  displayMode: DisplayMode,
  cellStatus: string,
  activeCellID: number | undefined,
  allSolveMethods: SolveType[]
): CellAnalysis => {
  return {
    inSelector: gridStatus === GridStatus.SELECTOR,
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
    isSolveableAny: false,
    isSolveableBlock: false,
    isSolveableColumn: false,
    isSolveableRow: false,
    isSolveableSingle: false,
    isCellSingleSolve: false,
    isComplete: gridStatus === GridStatus.COMPLETE,
    allSolveMethods,
    canActivate: (gridStatus !== GridStatus.PREVIEW && gridStatus !== GridStatus.SELECTOR && cellStatus !== 'preset') || gridStatus === GridStatus.BUILDER,
    activeCellID,
    gridStatus,
    displayMode,
  }
}