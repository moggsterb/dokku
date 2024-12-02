import { useEffect, useReducer } from "react";
import { Grid } from "../types";
import { GridActions, gridReducer } from "../grid";

// const useTicker = (initialStatus: GridStatus, gridCells: Cell[]) => {
const useTicker = (startGrid: Grid) => {

  const [grid, gridDispatch] = useReducer(
    gridReducer,
    startGrid
  );

  useEffect(() => {
    if (grid.sequencer) {
      console.log('tic')
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