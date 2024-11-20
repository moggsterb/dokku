import { cellsInEnnead, initialAnalysis } from "../cell";
import { takenInEnnead } from "../solving/analysis";
import { Cell, Enneads, GridStatus, DisplayMode, SolveableCells, IsSolveable, SolveType, EnneadType } from "../types";
import { CellAnalysis } from "../types/cell";

export const analyseCells = (
  cells: Cell[],
  enneads: Enneads,
  gridStatus: GridStatus,
  displayMode: DisplayMode,
  solveableCells: SolveableCells,
  focusCellID: number | undefined,
  focusValue: number | undefined,
  focusSolveable: IsSolveable
) => {
  const focusCellObj =
    focusCellID !== undefined ? cells[focusCellID] : undefined;

  return cells.map((cell, index) => {
    const cellAnalysis = analyseCell(
      cells,
      enneads,
      cell,
      gridStatus,
      displayMode,
      solveableCells,
      focusCellObj,
      focusValue,
      focusSolveable
    );
    return {
      ...cell,
      cellAnalysis
    };
  });
}



const analyseCell = (
  cells: Cell[],
  enneads: Enneads,
  cell: Cell,
  gridStatus: GridStatus,
  displayMode: DisplayMode,
  solveableCells: SolveableCells,
  focusCellObj: Cell | undefined,
  focusValue: number | undefined,
  focusSolveable: IsSolveable
): CellAnalysis => {
  const allSolveMethods = allSolveTypes(solveableCells, cell.id);
  const state: CellAnalysis = initialAnalysis(
    cell.value,
    gridStatus,
    displayMode,
    cell.status,
    focusCellObj?.id,
    allSolveMethods
  );

  const analysis = () => {
    switch (displayMode) {
      // when a cell without a value is clicked
      // - the cell and candidate grid is scaled up 
      // - influencing enneads are displayed
      case DisplayMode.MANUAL:
        return {
          ...state,
          isActive: cell.id === focusCellObj?.id,
          inConnectedBlock: cell.block === focusCellObj?.block,
          inConnectedColumn: cell.column === focusCellObj?.column,
          inConnectedRow: cell.row === focusCellObj?.row,
          hasFocusedValue: cell.value !== undefined && cell.value === focusValue,
        }
      // highlight all cells that are solveable (any method)
      case DisplayMode.ALL_ANY:
        return {
          ...state,
          isSolveable: isCellSolveable(solveableCells, cell.id, 'any', 'any'),
        }
      // highlight all cells that are solveable by SINGLE method
      case DisplayMode.ALL_SINGLE:
        return {
          ...state,
          isSolveable: isCellSolveable(solveableCells, cell.id, 'single', 'any')
        }
      // highlight all cells that are solveable by BLOCK SCANNING method
      case DisplayMode.ALL_BLOCK:
        return {
          ...state,
          isSolveable: isCellSolveable(solveableCells, cell.id, 'block', 'any')
        }
      // highlight all cells that are solveable by COLUMN SCANNING method
      case DisplayMode.ALL_COLUMN:
        return {
          ...state,
          isSolveable: isCellSolveable(solveableCells, cell.id, 'column', 'any')
        }
      // highlight all cells that are solveable by ROW SCANNING method
      case DisplayMode.ALL_ROW:
        return {
          ...state,
          isSolveable: isCellSolveable(solveableCells, cell.id, 'row', 'any')
        }

      // highlight a cell where solve method is single - and its influencing cells
      case DisplayMode.CELL_SINGLE:
        return {
          ...state,
          isActive: cell.id === focusCellObj?.id,
          inConnectedBlock: cell.block === focusCellObj?.block,
          inConnectedColumn: cell.column === focusCellObj?.column,
          inConnectedRow: cell.row === focusCellObj?.row,
          isSolveable: cell.id === focusCellObj?.id && isCellSolveable(solveableCells, cell.id, 'single', 'any')
        }

      // highlight a cell where solve method is block/column/row - and its barring cells
      case DisplayMode.CELL_BLOCK:
      case DisplayMode.CELL_COLUMN:
      case DisplayMode.CELL_ROW:

        // && cell.id !== focusCellObj?.id
        if (focusSolveable && focusCellObj && focusSolveable.scanEnneadType) {
          const { scanEnneadType, value } = focusSolveable;
          const scanEnneadID = focusCellObj[scanEnneadType]

          const { inBarredBlock, inBarredColumn, inBarredRow, outstandingCellIDs } = getBarringEnneads(
            cells,
            enneads,
            cell,
            value,
            scanEnneadType,
            scanEnneadID)

          const inConnectedBlock = scanEnneadType === 'block' && cell.block === focusCellObj?.block; // && cell.value !== undefined;
          const inConnectedColumn = scanEnneadType === 'column' && cell.column === focusCellObj?.column; //  && cell.value !== undefined;
          const inConnectedRow = scanEnneadType === 'row' && cell.row === focusCellObj?.row; //  && cell.value !== undefined;
          const hasFocusedValue = (inBarredBlock || inBarredColumn || inBarredRow) && cell.value === focusSolveable.value

          return {
            ...state,
            inBarredBlock,
            inBarredColumn,
            inBarredRow,
            isActive: cell.id === focusCellObj?.id,
            inConnectedBlock,
            inConnectedColumn,
            inConnectedRow,
            outstandingCellIDs,
            hasFocusedValue,
            isSolveable: cell.id === focusCellObj?.id && isCellSolveable(solveableCells, cell.id, 'any', focusValue)
          }
        }
        return {
          ...state,
          isActive: cell.id === focusCellObj?.id,
          isSolveable: cell.id === focusCellObj?.id && isCellSolveable(solveableCells, cell.id, 'any', focusValue)
        }

      case DisplayMode.SCANNING_VALUE:
        return {
          ...state,
          inBarredBlock: (state.hasValue && focusValue !== undefined) || takenInEnnead(cells, 'block', cell.block, focusValue),
          inBarredColumn: takenInEnnead(cells, 'column', cell.column, focusValue),
          inBarredRow: takenInEnnead(cells, 'row', cell.row, focusValue),
          isSolveable: isCellSolveable(solveableCells, cell.id, 'any', focusValue),
          hasFocusedValue: cell.value === focusValue,
        }
      default:
        return {
          ...state
        }
    }
  }

  return analysis();
}

export const allSolveTypes = (solveableCells: SolveableCells, cellID: number) => {
  return solveableCells
    .filter(solve => solve.cellID === cellID)
    .map(solve => solve.method)
}

export const isCellSolveable = (
  solveableCells: SolveableCells,
  cellID: number,
  method: SolveType | 'any',
  value: number | 'any' = 'any'
): IsSolveable => {
  const solves = solveableCells
    .filter(solve => solve.method === method || method === 'any')
    .filter(solve => solve.cellID === cellID && (value === 'any' || solve.solution === value));

  if (solves.length === 0) return false;

  const scanEnneadType = solves[0].method !== 'single' ? solves[0].method : undefined;

  return { type: solves[0].method, value: solves[0].solution, scanEnneadType }
}

const getBarringEnneads = (
  cells: Cell[],
  enneads: Enneads,
  cell: Cell,
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
    inBarredRow: isEnneadBarring('row', outstandingCellIDs, cells, enneads, cell, value),
    outstandingCellIDs
  }
}

const isEnneadBarring = (

  enneadType: EnneadType,
  outstandingCellIDs: number[],
  cells: Cell[],
  enneads: Enneads,
  cell: Cell,
  value: number,

): boolean => {
  const intersecting = cellsInEnnead(cells, enneadType, cell[enneadType])
    .map(cell => cell.id)
    .filter(value => outstandingCellIDs.includes(value));

  const taken = enneads[enneadType][cell[enneadType]].taken.includes(value)

  return taken && intersecting.length > 0;
}

export const getDisplayModeForType = (type: SolveType) => {


  switch (type) {
    case 'block':
      return DisplayMode.CELL_BLOCK;
    case 'row':
      return DisplayMode.CELL_ROW;
    case 'column':
      return DisplayMode.CELL_COLUMN;
    case 'single':
      return DisplayMode.CELL_SINGLE;
    default:
      return DisplayMode.CELL_ANY;
  }
}



