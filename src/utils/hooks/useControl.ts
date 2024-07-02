import { useEffect, useReducer, useState } from "react";
import { ICell } from "../types";
import { gridReducer, initialGrid } from "../grid";
import { initialCells } from "../cell";

const useControl = (initialStatus: string, gridCells: ICell[]) => {
  const outstandingCells: { cellID: number, value: number }[] = gridCells
    .filter(cell => cell.status === 'preset')
    .map(cell => { return { cellID: cell.id, value: cell.value || 0 } })
    .sort(() => Math.random() - 0.5);

  const [outstanding, setOutstanding] = useState(outstandingCells);
  const [count, setCount] = useState(0);
  const [grid, gridDispatch] = useReducer(
    gridReducer,
    initialGrid(initialStatus, initialStatus === 'auto' ? initialCells() : gridCells)
  );

  useEffect(() => {

    const interval = setInterval(() => {
      setCount(count + 1);
      if (grid.gridStatus === 'auto') {
        if (outstanding.length > 0) {
          gridDispatch({
            type: 'SET_CELL',
            payload: {
              cellID: outstanding[0].cellID,
              value: outstanding[0].value,
              type: 'preset'
            },
          });
          setOutstanding(outstanding.slice(1))
        } else {
          gridDispatch({
            type: 'UPDATE_STATUS',
            payload: {
              status: 'ready',
            },
          });
        }

      }
    }, 100);

    return () => clearInterval(interval);
  }, [count]);

  return { grid, gridDispatch }
}

export default useControl;