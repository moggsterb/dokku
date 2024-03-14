'use client';

import { initialCells } from '@/utils/cell';
import { useState } from 'react';
import Cell from './Cell';
import { ICell } from '@/utils/types';

const Grid = () => {
  const [cells, setCells] = useState<ICell[]>(initialCells());
  console.log({ cells });
  const RenderCells = () => {
    return cells.map((cell, index) => {
      return <Cell key={index} cell={cell} />;
    });
  };
  return <div className='grid'>{RenderCells()}</div>;
};

export default Grid;
