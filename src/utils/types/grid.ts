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

export interface Grid {
  gridStatus: GridStatus;
  displayMode: DisplayMode;

  cells: Cell[],
  enneads: Enneads;

  solveableCells: SolveableCells;
  solveableCellsByType: SolveableCellsByType;

  focusCellID: number | undefined;
  focusValue: number | undefined;
  focusSolveable: IsSolveable;

  // activeCell: ActiveCell
}