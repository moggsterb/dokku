import { useEffect, useReducer, useState } from "react";
import { GridStatus, Cell } from "../types";
import { gridReducer, initialGrid } from "../grid";
import { initialCells } from "../cell";

const useControl = (initialStatus: GridStatus, gridCells: Cell[]) => {
  const outstandingCells: { cellID: number, value: number }[] = gridCells
    .filter(cell => cell.status === 'preset')
    .map(cell => { return { cellID: cell.id, value: cell.value || 0 } })
    .sort(() => Math.random() - 0.5);

  const [outstanding, setOutstanding] = useState(outstandingCells);
  const [count, setCount] = useState(0);
  const [grid, gridDispatch] = useReducer(
    gridReducer,
    initialGrid(initialStatus, initialStatus === GridStatus.AUTO ? initialCells() : gridCells)
  );

  useEffect(() => {


    const interval = setInterval(() => {


      if (grid.gridStatus === GridStatus.AUTO) {
        setCount(count + 1);
        if (outstanding.length > 0) {
          gridDispatch({
            type: 'SET_CELL',
            payload: {
              cellID: outstanding[0].cellID,
              value: outstanding[0].value,
              type: 'preset'
            },
          });
          setOutstanding(outstanding.slice(1));

        } else {
          gridDispatch({
            type: 'UPDATE_STATUS',
            payload: {
              status: GridStatus.READY,
            },
          });

        }
      }

    }, 100);

    return () => clearInterval(interval);
  }, [count, outstanding, grid.gridStatus]);

  return { grid, gridDispatch }
}

export default useControl;