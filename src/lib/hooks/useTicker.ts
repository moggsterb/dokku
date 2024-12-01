import { useEffect, useReducer, useState } from "react";
import { GridStatus, Cell, CellStatus, DisplayMode } from "../types";
import { gridReducer, initialGrid, initialiseSequence } from "../grid";
import { initialCells } from "../cell";
import { SequenceType } from "../types/enums";

const useTicker = (initialStatus: GridStatus, gridCells: Cell[]) => {
  const [grid, gridDispatch] = useReducer(
    gridReducer,
    initialGrid(
      initialStatus,
      initialStatus === GridStatus.ASSEMBLING ? DisplayMode.ASSEMBLE : DisplayMode.READY,
      initialStatus === GridStatus.ASSEMBLING ? initialiseSequence(SequenceType.ASSEMBLE) : undefined,
      gridCells,
    )
  );

  useEffect(() => {
    if (grid.sequencer) {
      const interval = setInterval(() => {
        gridDispatch({
          type: 'INC_SEQUENCER',
        })
      }, grid.sequencer.frameRate)

      return () => clearInterval(interval);
    }

  })
  return { grid, gridDispatch }
}

export default useTicker;