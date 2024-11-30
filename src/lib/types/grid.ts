import { Cell } from "./cell";
import { Enneads } from "./ennead";
import { DisplayMode, GridStatus } from "./enums";
import { IsSolveable, SolveableCells, SolveableCellsByType } from "./solveable";

interface ActivatedCell {
  cellID: number;
  cellValue: number | undefined;
  isSolveable: IsSolveable;
}

export type ActiveCell = ActivatedCell | undefined

export interface SequencerTypes {
  type: 'Assemble' | 'Complete' | 'Scan' | 'Single'
  currentFrame: number;
}

export type Sequencer = SequencerTypes | undefined

export interface Grid {
  gridStatus: GridStatus;
  displayMode: DisplayMode;

  cells: Cell[],
  enneads: Enneads;

  solveableCells: SolveableCells;
  solveableCellsByType: SolveableCellsByType;

  activeCellID: number | undefined;

  sequencer: Sequencer;
}