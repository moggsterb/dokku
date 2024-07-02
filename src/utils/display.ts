import { cellsInEnnead } from "./cell";
import { takenCellValues, takenInEnnead } from "./solving/analysis";
import { EnneadType, ICell, IEnneads, IsSolveable, SolveableCells } from "./types";


export interface IDisplayCellProps {
  id?: number,
  cell: ICell,
  hasValue: boolean;
  isActive: boolean;
  inActiveBlock: boolean;
  inActiveColumn: boolean;
  inActiveRow: boolean;
  canActivate: boolean;

  hasFocusedValue: boolean;
  inBarredBlock: boolean;
  inBarredRow: boolean;
  inBarredColumn: boolean;
  isSolveable: IsSolveable;
  // scanEnneadTypes: EnneadType[];

  gridStatus: string;
}

export const displayCell = (
  cells: ICell[],
  enneads: IEnneads,
  cell: ICell,
  gridStatus: string,
  displayMode: string,
  focusCellObj: ICell | undefined,
  focusValue: number | undefined,
  solveableCells: SolveableCells,
  focusSolveable: IsSolveable
): IDisplayCellProps => {

  const state: IDisplayCellProps = {
    hasValue: cell.value !== undefined,
    isActive: false,
    inActiveBlock: false,
    inActiveColumn: false,
    inActiveRow: false,
    hasFocusedValue: false,
    inBarredBlock: false,
    inBarredColumn: false,
    inBarredRow: false,
    isSolveable: false,
    canActivate: (gridStatus !== 'preview' && cell.status !== 'preset') || gridStatus === 'builder',
    gridStatus,
    cell,
  }

  const modeState = () => {
    switch (displayMode) {
      case 'manual':
        return {
          ...state,
          isActive: cell.id === focusCellObj?.id,
          inActiveBlock: cell.block === focusCellObj?.block,
          inActiveColumn: cell.column === focusCellObj?.column,
          inActiveRow: cell.row === focusCellObj?.row,
          hasFocusedValue: cell.value !== undefined && cell.value === focusValue,
        }
      case 'singles_all':
        return {
          ...state,
          isSolveable: isCellSolveable(solveableCells, cell.id, 'single', 'any')
        }

      case 'singles_solve_cell':
        return {
          ...state,
          inActiveBlock: cell.block === focusCellObj?.block,
          inActiveColumn: cell.column === focusCellObj?.column,
          inActiveRow: cell.row === focusCellObj?.row,
          isSolveable: cell.id === focusCellObj?.id && isCellSolveable(solveableCells, cell.id, 'single', 'any')
        }
      case 'scanning_blocks':
        return {
          ...state,
          isSolveable: isCellSolveable(solveableCells, cell.id, 'block', 'any')
        }
      case 'scanning_columns':
        return {
          ...state,
          isSolveable: isCellSolveable(solveableCells, cell.id, 'column', 'any')
        }
      case 'scanning_rows':
        return {
          ...state,
          isSolveable: isCellSolveable(solveableCells, cell.id, 'row', 'any')
        }

      case 'scanning_value':
        return {
          ...state,
          inBarredBlock: (state.hasValue && focusValue !== undefined) || takenInEnnead(cells, 'block', cell.block, focusValue),
          inBarredColumn: takenInEnnead(cells, 'column', cell.column, focusValue),
          inBarredRow: takenInEnnead(cells, 'row', cell.row, focusValue),
          isSolveable: isCellSolveable(solveableCells, cell.id, 'any', focusValue),
          hasFocusedValue: cell.value === focusValue,
        }

      case 'scanning_solve_cell':

        if (focusSolveable && focusCellObj && focusSolveable.scanEnneadType && cell.id !== focusCellObj?.id) {
          const { scanEnneadType, value } = focusSolveable;
          const scanEnneadID = focusCellObj[scanEnneadType]

          const { inBarredBlock, inBarredColumn, inBarredRow } = getBarringEnneads(
            cells,
            enneads,
            cell,
            value,
            scanEnneadType,
            scanEnneadID)

          return {
            ...state,
            inBarredBlock,
            inBarredColumn,
            inBarredRow,
            inActiveBlock: scanEnneadType === 'block' && cell.block === focusCellObj?.block && cell.value !== undefined,
            inActiveColumn: scanEnneadType === 'column' && cell.column === focusCellObj?.column && cell.value !== undefined,
            inActiveRow: scanEnneadType === 'row' && cell.row === focusCellObj?.row && cell.value !== undefined,
            hasFocusedValue: (inBarredBlock || inBarredColumn || inBarredRow) && cell.value === focusSolveable.value,
            isSolveable: cell.id === focusCellObj?.id && isCellSolveable(solveableCells, cell.id, 'any', focusValue)
          }
        }
        return {
          ...state,
          isSolveable: cell.id === focusCellObj?.id && isCellSolveable(solveableCells, cell.id, 'any', focusValue)
        }

      default:
        return { ...state }
    };
  };

  return modeState();
}

interface ISolveList {
  cellID: number, option: number, type?: EnneadType
}

export const isCellSolveable = (
  solveableCells: SolveableCells,
  cellID: number,
  method: 'block' | 'column' | 'row' | 'single' | 'any',
  value: number | 'any' = 'any'
): IsSolveable => {
  const solves = solveableCells
    .filter(cell => cell.method === method || method === 'any')
    .filter(cell => cell.cellID === cellID && (value === 'any' || cell.solution === value));

  if (solves.length === 0) return false;

  const scanEnneadType = solves[0].method !== 'single' ? solves[0].method : undefined;

  return { type: solves[0].method, value: solves[0].solution, scanEnneadType }
}

const getBarringEnneads = (
  cells: ICell[],
  enneads: IEnneads,
  cell: ICell,
  value: number,
  scanEnneadType: EnneadType,
  scanEnneadID: number,
) => {
  const outstandingCellIDs = cellsInEnnead(cells, scanEnneadType, scanEnneadID)
    .filter(cell => !cell.value)
    .map(cell => cell.id);

  return {
    inBarredBlock: isEnneadBarring('block', outstandingCellIDs, cells, enneads, cell, value),
    inBarredColumn: isEnneadBarring('column', outstandingCellIDs, cells, enneads, cell, value),
    inBarredRow: isEnneadBarring('row', outstandingCellIDs, cells, enneads, cell, value)
  }
}

const isEnneadBarring = (

  enneadType: EnneadType,
  outstandingCellIDs: number[],
  cells: ICell[],
  enneads: IEnneads,
  cell: ICell,
  value: number,

): boolean => {
  const intersecting = cellsInEnnead(cells, enneadType, cell[enneadType])
    .map(cell => cell.id)
    .filter(value => outstandingCellIDs.includes(value));

  const taken = enneads[enneadType][cell[enneadType]].taken.includes(value)

  return taken && intersecting.length > 0;
}
