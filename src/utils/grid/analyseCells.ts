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
  activeCell: Cell | undefined,
  activeSolveable: IsSolveable,
) => {


  return cells.map((cell, index) => {
    const cellAnalysis = analyseCell(
      cells,
      enneads,
      cell,
      gridStatus,
      displayMode,
      solveableCells,
      activeCell,
      activeSolveable
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
  activeCell: Cell | undefined,
  activeSolveable: IsSolveable,
): CellAnalysis => {
  const allSolveMethods = allSolveTypes(solveableCells, cell.id);
  const state: CellAnalysis = initialAnalysis(
    cell.value,
    gridStatus,
    displayMode,
    cell.status,
    activeCell?.id,
    allSolveMethods
  );

  const analysis = () => {

    const activeCellID = activeCell?.id;
    const activeBlock = activeCell?.block;
    const activeColumn = activeCell?.column;
    const activeRow = activeCell?.row;
    const activeValue = activeCell?.value

    switch (displayMode) {
      // when a cell without a value is clicked
      // - the cell and candidate grid is scaled up 
      // - influencing enneads are displayed
      case DisplayMode.MANUAL:
        return {
          ...state,
          isActive: cell.id === activeCellID,
          inConnectedBlock: cell.block === activeBlock,
          inConnectedColumn: cell.column === activeColumn,
          inConnectedRow: cell.row === activeRow,
          hasFocusedValue: cell.value !== undefined && cell.value === activeValue,
        }
      // highlight all cells that are solveable (any method)
      case DisplayMode.ALL_ANY:
        const isSolveableAny = isCellSolveable(solveableCells, cell.id, 'any', 'any')
        return {
          ...state,
          isSolveable: isSolveableAny,
          isSolveableAny: isSolveableAny !== false
        }
      // highlight all cells that are solveable by SINGLE method
      case DisplayMode.ALL_SINGLE:
        const isSolveableSingle = isCellSolveable(solveableCells, cell.id, 'single', 'any');
        return {
          ...state,
          isSolveable: isSolveableSingle,
          isSolveableSingle: isSolveableSingle !== false
        }
      // highlight all cells that are solveable by BLOCK SCANNING method
      case DisplayMode.ALL_BLOCK:
        const isSolveableBlock = isCellSolveable(solveableCells, cell.id, 'block', 'any');
        return {
          ...state,
          isSolveable: isSolveableBlock,
          isSolveableBlock: isSolveableBlock !== false
        }
      // highlight all cells that are solveable by COLUMN SCANNING method
      case DisplayMode.ALL_COLUMN:
        const isSolveableColumn = isCellSolveable(solveableCells, cell.id, 'column', 'any')
        return {
          ...state,
          isSolveable: isSolveableColumn,
          isSolveableColumn: isSolveableColumn !== false
        }
      // highlight all cells that are solveable by ROW SCANNING method
      case DisplayMode.ALL_ROW:
        const isSolveableRow = isCellSolveable(solveableCells, cell.id, 'row', 'any');
        return {
          ...state,
          isSolveable: isSolveableRow,
          isSolveableRow: isSolveableRow !== false
        }

      // highlight a cell where solve method is single - and its influencing cells
      case DisplayMode.CELL_SINGLE:
        const isCellSingleSolve = cell.id === activeCellID ? isCellSolveable(solveableCells, cell.id, 'single', 'any') : false
        return {
          ...state,
          isActive: cell.id === activeCellID,
          inConnectedBlock: cell.block === activeBlock,
          inConnectedColumn: cell.column === activeColumn,
          inConnectedRow: cell.row === activeRow,
          isSolveable: isCellSingleSolve,
          isCellSingleSolve: isCellSingleSolve !== false
        }

      // highlight a cell where solve method is block/column/row - and its barring cells
      case DisplayMode.CELL_BLOCK:
      case DisplayMode.CELL_COLUMN:
      case DisplayMode.CELL_ROW:

        // && cell.id !== activeCellID
        if (activeSolveable && activeCell && activeSolveable.scanEnneadType) {
          const { scanEnneadType, value } = activeSolveable;
          const scanEnneadID = activeCell[scanEnneadType]

          const { inBarredBlock, inBarredColumn, inBarredRow, outstandingCellIDs } = getBarringEnneads(
            cells,
            enneads,
            cell,
            value,
            scanEnneadType,
            scanEnneadID)

          const inConnectedBlock = scanEnneadType === 'block' && cell.block === activeBlock; // && cell.value !== undefined;
          const inConnectedColumn = scanEnneadType === 'column' && cell.column === activeColumn; //  && cell.value !== undefined;
          const inConnectedRow = scanEnneadType === 'row' && cell.row === activeRow; //  && cell.value !== undefined;
          const hasFocusedValue = (inBarredBlock || inBarredColumn || inBarredRow) && cell.value === activeSolveable.value

          return {
            ...state,
            inBarredBlock,
            inBarredColumn,
            inBarredRow,
            isActive: cell.id === activeCellID,
            inConnectedBlock,
            inConnectedColumn,
            inConnectedRow,
            outstandingCellIDs,
            hasFocusedValue,
            isSolveable: cell.id === activeCellID && isCellSolveable(solveableCells, cell.id, 'any', activeValue)
          }
        }
        return {
          ...state,
          isActive: cell.id === activeCellID,
          isSolveable: cell.id === activeCellID && isCellSolveable(solveableCells, cell.id, 'any', activeValue)
        }

      case DisplayMode.SCANNING_VALUE:
        return {
          ...state,
          inBarredBlock: (state.hasValue && activeValue !== undefined) || takenInEnnead(cells, 'block', cell.block, activeValue),
          inBarredColumn: takenInEnnead(cells, 'column', cell.column, activeValue),
          inBarredRow: takenInEnnead(cells, 'row', cell.row, activeValue),
          isSolveable: isCellSolveable(solveableCells, cell.id, 'any', activeValue),
          hasFocusedValue: cell.value === activeValue,
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

export const getTypeForDisplayMode = (displayMode: DisplayMode) => {
  switch (displayMode) {
    case DisplayMode.CELL_BLOCK:
      return 'block';
    case DisplayMode.CELL_ROW:
      return 'row';
    case DisplayMode.CELL_COLUMN:
      return 'column';
    case DisplayMode.CELL_SINGLE:
      return 'single';
    default:
      return 'any'
  }
}




