import { setCells } from "../cell"
import { Cell, Sequencer, SequencerTypes } from "../types"
import { CellStatus, DisplayMode, GridStatus, SequenceType } from "../types/enums"


export const initialiseSequence = (type: SequenceType): Sequencer => {
  switch (type) {
    case SequenceType.ASSEMBLE:
      return { sequenceType: SequenceType.ASSEMBLE, currentFrame: 1, frameRate: 150 }
    case SequenceType.COMPLETE:
      return { sequenceType: SequenceType.COMPLETE, currentFrame: 1, frameRate: 1000 }
    default:
      return undefined
  }
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