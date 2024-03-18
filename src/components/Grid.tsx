'use client';

import { cellReducer, getTakenValues, initialCells } from '@/utils/cell';
import { useReducer, useState } from 'react';
import Cell from './Cell';
import { ICell } from '@/utils/types';
import ValueSelector from './ValueSelector';

interface Props {
  initialCells: ICell[];
}

const Grid = ({ initialCells }: Props) => {
  const [cells, cellDispatch] = useReducer(cellReducer, initialCells);
  const [activeCell, setActiveCell] = useState<number>();

  const handleCellClick = (value: number) => {
    setActiveCell(value !== activeCell ? value : undefined);
  };

  const setCellValue = (value: number | string) => {
    if (activeCell !== undefined) {
      const cell = { ...cells[activeCell] };

      cell.value = typeof value === 'number' ? value : 0;
      cell.status = typeof value === 'number' ? 'preset' : 'unsolved';

      cellDispatch({ type: 'UPDATE_CELL', payload: { cell } });
      setActiveCell(undefined);
    }
  };

  const RenderCells = () => {
    let litRow: number, litColumn: number, litBlock: number;
    if (activeCell) {
      const activeCellOObject = cells[activeCell];
      litRow = activeCellOObject.row;
      litColumn = activeCellOObject.column;
      litBlock = activeCellOObject.block;
    }

    return cells.map((cell, index) => {
      return (
        <Cell
          key={index}
          cell={cell}
          isActive={activeCell === cell.id}
          isLit={
            cell.row === litRow ||
            cell.column === litColumn ||
            cell.block === litBlock
          }
          clickHandler={handleCellClick}
        />
      );
    });
  };

  return (
    <>
      <div className='grid'>{RenderCells()}</div>
      <div className='grid-controls'>
        {activeCell !== undefined && (
          <ValueSelector
            taken={getTakenValues(cells, cells[activeCell])}
            setCellValue={setCellValue}
          />
        )}
      </div>
    </>
  );
};

export default Grid;
