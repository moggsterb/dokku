# Coding The Dokku Project

Dokku is a sudoku solver developed with React and Next.js, designed to tackle complex problem-solving while maintaining a clean, intuitive user experience.

This project serves as my go-to exercise for refining advanced coding skills and algorithmic thinking. In addition, it focuses my UX skills to ensure simplicity and usability at the forefront of the interface design.

### Dokku is built with:

- React 18
- Next 14
- Module SCSS
- Responsive Web

## Dokku Grid Update Process

_Dokku_ employs a reducer to manage the Grid's state, which includes:

- **Cell Object Array**: A collection of 81 cell objects representing the entire Sudoku grid.
- **Ennead Object Array**: Each type of ennead (Blocks, Columns, and Rows) has a 9-object array to track candidates taken in each ennead.
- **Grid Status**: The current stage of progress in solving the puzzle.
- **Display Status**: User interface details, such as whether the user is focusing on a particular cell or viewing all solvable cells for a specific method.

### The Analysis Process

Whenever the grid state is updated, _Dokku_ performs a post-update analysis to identify solvable cells and assign enough information to allow each cell to be re-rendered.

1. **Candidates are updated**

   - The list of potential candidates for every cell and ennead is recalculated.

2. **Solvable cells are identified**

   - Cells that can be solved using Block, Column, or Row scanning methods are identified.
   - Cells with only one single remaining valid candidate are flagged as solvable.

3. **A Solvable Cells object is created**

   - This is a summary of each solvable cell and the methods that can be used to solve it.

4. **Cells are assigned a Display Analysis object**
   - Each cell is assigned an object that dictates its visual presentation during rendering.
   - The display properties are determined by:
     - The current state of the cell.
     - The grid's display mode.
     - The relationship between the cell and any selected (active) cell.
