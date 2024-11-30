# Animations

## 1. When gridStatus = assembling

- on each tick
  - get outstandingCells
  - if tickCount > outstandingCells.length Set gridStatus = 'PLAYING'
  - else set OutstandingCell[tickCount] with value

## 2. When displayMode = CELL_BLOCK, CELL_COLUMN, CELL_ROW

- on each tick
  - if tickCount = 1 highlight all 9 ennead cells
  - if tickCount > 1
    - get solveValue
    - find intersecting solveValues (ISV)
    - Remove any that don't block a cell
    - foreach ISV
      - highlight ISV
      - Add an X in blocked cells
    - when all cells except active blocked
      - highlight active cell with solution

## 3. When displayMode = CELL_SINGLE

- on each tick
  - get modulo of ticker / 9
  - highlight each connected value === modulo
  - repeat

## 4. When gridStatus = completed

- on each tick
  - get modulo of ticker / 9
  - highlight values === modulu
  - repeat

# PLAN

Add a anim var to Grid Status
{
stage: number
status: ANIMATE, DONE
loop: boolean
}

Control Ticker will update the grid state which will trigger a display update.

1. [ ] remane control hook to ticker
2. [ ] Add anim to grid state
3. [ ] modify (ticker) to update it (which will force the display update)

4. [ ] refactor anims for ASSEMBLE
5. refactor anims for COMPLETE
6. refactor anims for SINGLE
7. refactor anims for SCANNING
