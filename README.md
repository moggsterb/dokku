# Dokku

## A Sudoku Solver

Dokku is a sudoku solver developed with React and Next.js,
designed to tackle complex problem-solving while maintaining a
clean, intuitive user experience.

This project serves as my go-to exercise for refining advanced
coding skills and algorithmic thinking. In addition it focuses
my UX skills to ensure simplicity and usability at the
forefront of the interface design.

## How _Dokku_ Solves Sudoku Puzzles

_Dokku_ is a sophisticated Sudoku solver that applies four key strategies simultaneously, allowing users to see in real time how many cells are solvable and which method can be used for each one.

Here's how _Dokku_ works in its current form:

### 1. Block Scanning

_Dokku_ constantly analyzes each 3x3 block, identifying missing numbers and narrowing down possible placements by cross-referencing intersecting rows and columns. Users can see which cells in each block can be solved based on this method, helping to visually track progress.

### 2. Row Scanning

At the same time, _Dokku_ scans rows to find missing numbers, using the numbers already placed in intersecting columns and blocks to eliminate invalid options. _Dokku_ provides a clear view of how many cells in each row can be solved using this technique, giving users a live status of solvable cells.

### 3. Column Scanning

Simultaneously, _Dokku_ applies the same process to columns, identifying solvable cells by checking the row and block constraints for each number. Users can track how many cells in each column are ready to be filled based on column scanning, combining information from all scanning strategies.

### 4. Single Candidate

While scanning rows, columns, and blocks, _Dokku_ is also continuously identifying single candidates—cells where only one number can fit based on the current state of the grid. These cells are immediately flagged as solvable, and users can see how many of these single candidates are available at any given moment.

---

### A Dynamic, Simultaneous Approach

_Dokku_ doesn’t apply these strategies one at a time—it works dynamically, using all four techniques at once to solve as many cells as possible. Users can watch as _Dokku_ highlights solvable cells and explains which method can be used, creating an engaging and transparent solving experience.

This approach is highly effective for many puzzles, but some more complex grids require additional strategies beyond these four.

---

## The Next Phase: Advanced Solving Techniques

While these four strategies are highly effective for a wide range of puzzles, some more challenging Sudoku grids require more complex methods to fully solve. In future iterations, _Dokku_ could expand its capabilities to include these advanced techniques:

### 1. **Naked and Hidden Pairs/Triples**

These techniques involve identifying pairs or triples of numbers that must go in a certain group of cells within a row, column, or block.

- **Naked Pairs/Triples**: If two (or three) cells in a row, column, or block can only hold the same two (or three) numbers, other numbers can be eliminated from those cells, helping to narrow down possibilities.
- **Hidden Pairs/Triples**: When two (or three) numbers can only fit in certain cells within a group, even if those cells have other candidates, these numbers can be locked in, allowing further eliminations.

### 2. **Pointing Pairs**

This method involves looking for numbers that are restricted to two cells in a row or column within a block. If those two cells are in the same row or column, the number can be eliminated from that row or column outside the block.

### 3. **X-Wing**

The X-Wing technique focuses on pairs of candidates that appear in the same two columns (or rows) in two different rows (or columns). When this pattern occurs, the number can be eliminated from other positions in those columns or rows, unlocking further possibilities.

### 4. **Swordfish**

A more complex version of X-Wing, Swordfish deals with three rows and three columns where a number appears in exactly three cells across each. This allows eliminations similar to X-Wing but on a larger scale.

### 5. **Guessing Techniques (e.g., Trial and Error)**

When logic-based methods run out of clear moves, some solvers resort to guessing techniques such as **backtracking** or **bifurcation**. In these methods, _Dokku_ could try placing a candidate in a cell and see if it leads to a valid solution. If not, it can backtrack and try another option.

---

By rolling out these more advanced techniques in the future, _Dokku_ could evolve into an even more powerful solver, tackling even the most complex and challenging puzzles with ease.
