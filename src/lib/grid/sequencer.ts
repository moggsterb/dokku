import { cellsInEnnead, setCells } from "../cell"
import { getTypeForDisplayMode, isCellSolveable } from "../solving/analyseCells"
import { Cell, Ennead, Enneads, Grid, Sequencer, SequencerTypes } from "../types"
import { CellStatus, DisplayMode, EnneadType, GridStatus, SequenceType } from "../types/enums"


export const initialiseSequence = (type: SequenceType | DisplayMode, grid?: Grid, activeCellID?: number): Sequencer => {
  switch (type) {
    case SequenceType.ASSEMBLE:
      return { sequenceType: SequenceType.ASSEMBLE, currentFrame: 1, frameRate: 150 }
    case SequenceType.COMPLETE:
      return { sequenceType: SequenceType.COMPLETE, currentFrame: 1, frameRate: 750, limit: 9 }
    case DisplayMode.CELL_SINGLE:
      return { sequenceType: SequenceType.SINGLE, currentFrame: 1, frameRate: 500, limit: 9 }
    case DisplayMode.CELL_BLOCK:
    case DisplayMode.CELL_COLUMN:
    case DisplayMode.CELL_ROW:
      const data = grid && activeCellID !== undefined && buildScanData(grid, type, activeCellID) || { intersections: [] }
      const limit = data?.intersections.length * 3 + 2
      return { sequenceType: SequenceType.SCAN, currentFrame: 1, frameRate: 200, data, limit }
    default:
      return undefined
  }
}

interface Intersection {
  enneadType: EnneadType,
  enneadID: number,
  cellIDWithMatchingValue: number
  outstandingCellIDs: number[]
}

const buildScanData = (grid: Grid, displayMode: DisplayMode, activeCellID: number) => {
  const { cells, solveableCells } = grid
  const activeCell = activeCellID !== undefined ? cells[activeCellID] : undefined;
  const activeSolveable = activeCellID !== undefined ? isCellSolveable(solveableCells, activeCellID, getTypeForDisplayMode(displayMode) || 'any', 'any') : false;

  if (activeSolveable && activeCell && activeSolveable.scanEnneadType) {
    const { scanEnneadType, value: solveableValue } = activeSolveable;
    const scanEnneadID = activeCell[scanEnneadType]
    const enneadCells = cellsInEnnead(cells, scanEnneadType, scanEnneadID)

    // const enneadCellIDsInEnnead = enneadCells.map(cell => cell.id)
    // const outstandingEnneadCellIDs = enneadCells
    //   .filter(cell => !cell.value)
    //   .map(cell => cell.id);

    const intersections: Intersection[] = [];
    let blockedCellIDs: number[] = [];

    const allCellsWithMatch = cells.filter(cell => cell.value === solveableValue)
    allCellsWithMatch.forEach(cell => {
      [EnneadType.BLOCK, EnneadType.ROW, EnneadType.COLUMN].forEach(checkET => {
        const outstandingCellIDs = cells
          .filter(rowCell => cell[checkET] === rowCell[checkET])
          .filter(rowCell => rowCell.value === undefined)
          .filter(rowCell => rowCell[scanEnneadType] === scanEnneadID)
          .filter(rowCell => !blockedCellIDs.includes(rowCell.id))
          .map(rowCell => rowCell.id)

        if (outstandingCellIDs.length > 0) {
          intersections.push({
            enneadType: checkET,
            enneadID: cell[checkET],
            cellIDWithMatchingValue: cell.id,
            outstandingCellIDs
          })
          blockedCellIDs = blockedCellIDs.concat(outstandingCellIDs)
        }
      })
    })

    return {
      activeCellID,
      solveableValue,
      // scanEnneadType,
      // scanEnneadID,
      connectToBlock: scanEnneadType === EnneadType.BLOCK && scanEnneadID,
      connectToRow: scanEnneadType === EnneadType.ROW && scanEnneadID,
      connectToColumn: scanEnneadType === EnneadType.COLUMN && scanEnneadID,

      // enneadCellIDsInEnnead,
      // outstandingEnneadCellIDs,
      intersections
    }
  }
}

export const cellMatches = (cell: Cell, intersections: Intersection[]) => {
  return intersections.findIndex(({ cellIDWithMatchingValue }) => cellIDWithMatchingValue === cell.id);
}

export const cellIsBarred = (cell: Cell, intersections: Intersection[], checkEnneadType: EnneadType) => {
  return intersections
    .findIndex(({ enneadID, enneadType }) => enneadType === checkEnneadType && cell[checkEnneadType] === enneadID)
}

export const cellNeedsAnX = (cell: Cell, intersections: Intersection[]) => {
  return intersections.findIndex(({ outstandingCellIDs }) => outstandingCellIDs.includes(cell.id));
}

export const incSequenceFrame = (sequencer: Sequencer, limit?: number): Sequencer => {
  if (!sequencer) return undefined;
  let { currentFrame } = sequencer;
  currentFrame += 1;
  if (limit && currentFrame > limit) {
    currentFrame = 1;
  }
  return {
    ...sequencer,
    currentFrame
  }
}

export const sequencePresets = (cells: Cell[], sequencer: Sequencer) => {
  const unRevealedPresets = cells.filter(cell => (cell.status === CellStatus.PRESET && cell.value === undefined))
  const sequenceComplete = unRevealedPresets.length === 0
  if (sequenceComplete) {
    return {
      sequencer: undefined,
      displayMode: DisplayMode.READY,
      gridStatus: GridStatus.PLAYING,
    }
  }
  const revealCell = unRevealedPresets[Math.floor(Math.random() * unRevealedPresets.length)]
  return {
    cells: setCells([...cells], [revealCell.id], revealCell.presetValue, CellStatus.PRESET),
    sequencer: incSequenceFrame(sequencer)
  }
}