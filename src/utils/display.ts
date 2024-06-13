import { cellsInEnnead } from "./cell";
import { takenCellValues, takenInEnnead } from "./solving/analysis";
import { EnneadType, ICell, IEnneads, IScanningSolve, ISingleSolve, IsSolveable } from "./types";


export interface IDisplayCellProps {
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
  // scanTypes: EnneadType[];

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
  scanningSolves: IScanningSolve[],
  singleSolves: ISingleSolve[],
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
    canActivate: gridStatus !== 'preview', //&& cell.status !== 'preset',
    gridStatus,
    cell,
  }



  // const inBarredBlock = (hasValue && focusValue !== undefined) || takenInEnnead(cells, 'block', cell.block, focusValue);
  // const inBarredColumn = takenInEnnead(cells, 'column', cell.column, focusValue);
  // const inBarredRow = takenInEnnead(cells, 'row', cell.row, focusValue);



  // true if in scanningSolves.filter (cellID and option = value)
  // const scanning = scanningSolves.filter(item => item.cellID === cell.id && item.option === focusValue)
  // const isSolveable = scanning.length > 0;
  // const solveableValue = isSolveable ? focusValue : undefined;
  // const scanTypes = scanning.map(item => item.type).sort()



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
          isSolveable: isCellSolveable(singleSolves, cell.id, 'single', 'all')
        }

      case 'singles_solve_cell':
        return {
          ...state,
          inActiveBlock: cell.block === focusCellObj?.block,
          inActiveColumn: cell.column === focusCellObj?.column,
          inActiveRow: cell.row === focusCellObj?.row,
          isSolveable: cell.id === focusCellObj?.id && isCellSolveable(singleSolves, cell.id, 'single', 'all')
        }
      case 'scanning_all':
        return {
          ...state,
          isSolveable: isCellSolveable(scanningSolves, cell.id, 'scanning', 'all')
        }
      case 'scanning_value':
        return {
          ...state,
          inBarredBlock: (state.hasValue && focusValue !== undefined) || takenInEnnead(cells, 'block', cell.block, focusValue),
          inBarredColumn: takenInEnnead(cells, 'column', cell.column, focusValue),
          inBarredRow: takenInEnnead(cells, 'row', cell.row, focusValue),
          isSolveable: isCellSolveable(scanningSolves, cell.id, 'scanning', focusValue),
          hasFocusedValue: cell.value === focusValue,
        }

      case 'scanning_solve_cell':

        if (focusSolveable && focusCellObj && focusSolveable.scanType && cell.id !== focusCellObj?.id) {
          const { scanType, value } = focusSolveable;
          const intersects = enneads[scanType][focusCellObj[scanType]].intersects;
          const cellValues = enneads[scanType][focusCellObj[scanType]].cellValues;

          console.log({ cellValues, scanType, row: cell[scanType] })


          const inBarredBlock = intersects.block.includes(cell.block) && enneads.block[cell.block].taken.includes(value)
          const inBarredColumn = intersects.column.filter(item => cellValues[item] === undefined || scanType === 'block').includes(cell.column) && enneads.column[cell.column].taken.includes(value)
          const inBarredRow = intersects.row.filter(item => cellValues[item] === undefined || scanType === 'block').includes(cell.row) && enneads.row[cell.row].taken.includes(value)

          return {
            ...state,
            inBarredBlock,
            inBarredColumn,
            inBarredRow,
            inActiveBlock: scanType === 'block' && cell.block === focusCellObj?.block && cell.value !== undefined,
            inActiveColumn: scanType === 'column' && cell.column === focusCellObj?.column && cell.value !== undefined,
            inActiveRow: scanType === 'row' && cell.row === focusCellObj?.row && cell.value !== undefined,
            hasFocusedValue: (inBarredBlock || inBarredColumn || inBarredRow) && cell.value === focusSolveable.value,

            isSolveable: cell.id === focusCellObj?.id && isCellSolveable(scanningSolves, cell.id, 'scanning', focusValue)
          }
        }
        return {
          ...state,
          isSolveable: cell.id === focusCellObj?.id && isCellSolveable(scanningSolves, cell.id, 'scanning', focusValue)
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
  solveList: ISolveList[],
  cellID: number,
  type: 'scanning' | 'single',
  value: number | 'all' = 'all'
): IsSolveable => {
  const solves = solveList.filter(item => item.cellID === cellID && (value === 'all' || item.option === value));

  if (solves.length === 0) return false;

  return { type, value: solves[0].option, scanType: solves[0].type && solves[0].type }
}
