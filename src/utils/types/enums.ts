export enum GridStatus {
  BUILDER = 'builder',
  SELECTOR = 'selector',
  PREVIEW = 'preview',
  AUTO = 'auto',
  READY = 'ready',
  COMPLETE = 'complete',
}

export enum DisplayMode {
  READY = 'ready',
  MANUAL = 'manual',
  ACTIVE_CELL = 'active_cell',
  ALL_ANY = 'all_any',
  ALL_SINGLE = 'all_single',
  ALL_BLOCK = 'all_block',
  ALL_COLUMN = 'all_column',
  ALL_ROW = 'all_row',
  CELL_SINGLE = 'cell_single',
  CELL_BLOCK = 'cell_block',
  CELL_COLUMN = 'cell_column',
  CELL_ROW = 'cell_row',
  CELL_ANY = 'cell_any',
  SCANNING_VALUE = 'scanning_value',
  COMPLETE = 'complete',
}

export enum CellStatus {
  PRESET = 'preset',
  UNSOLVED = 'unsolved',
  SOLVED = 'solved'
}

export enum EnneadType {
  BLOCK = 'block',
  ROW = 'row',
  COLUMN = 'column'
}

export enum SolveType {
  ANY = 'any',
  BLOCK = 'block',
  ROW = 'row',
  COLUMN = 'column',
  SINGLE = 'single'

}

// export type EnneadType = 'block' | 'row' | 'column';