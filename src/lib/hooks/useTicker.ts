import { useEffect, useReducer, useState } from "react";
import { GridStatus, Cell, CellStatus, DisplayMode } from "../types";
import { gridReducer, initialGrid } from "../grid";
import { initialCells } from "../cell";

const useTicker = (initialStatus: GridStatus, gridCells: Cell[]) => {
  const [grid, gridDispatch] = useReducer(
    gridReducer,
    initialGrid(
      initialStatus,
      initialStatus === GridStatus.ASSEMBLING ? DisplayMode.ASSEMBLE : DisplayMode.READY,
      initialStatus === GridStatus.ASSEMBLING ? 1 : undefined,
      gridCells,
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (grid.sequencer) {
        gridDispatch({
          type: 'INC_SEQUENCER',
        })
      }

    }, 100)

    return () => clearInterval(interval);

  })
  return { grid, gridDispatch }
}

export default useTicker;