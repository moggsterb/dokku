import { GridStatus, DisplayMode, SolveType } from "../types"
import { CellAnalysis } from "../types/cell"

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