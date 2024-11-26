import styles from './About.module.scss';

const Coding = () => {
  return (
    <div className={styles.copyWrapper}>
      <div className={styles.copy}>
        <h1>Coding The Dokku Project</h1>

        <p>
          Dokku is a sudoku solver developed with React and Next.js, designed to
          tackle complex problem-solving while maintaining a clean, intuitive
          user experience.
        </p>

        <p>
          This project serves as my go-to exercise for refining advanced coding
          skills and algorithmic thinking. In addition it focuses my UX skills
          to ensure simplicity and usability at the forefront of the interface
          design.
        </p>

        <p>Dokku is built with</p>

        <ul>
          <li>React 18</li>
          <li>Next 14</li>
          <li>TypeScript</li>
          <li>Module SCSS</li>
          <li>Responsive Web</li>
        </ul>

        <h2>Dokku Grid Update Process</h2>
        <p>
          <em>Dokku</em> employs a reducer to manage the Grid's state, which
          includes:
        </p>
        <ul>
          <li>
            <strong>Cell Object Array</strong>: A collection of 81 cell objects
            representing the entire Sudoku grid.
          </li>
          <li>
            <strong>Ennead Object Array</strong>: Each type of ennead (Blocks,
            Columns, and Rows) has a 9 object array to track candidates taken in
            each ennead.
          </li>
          <li>
            <strong>Grid Status</strong>: The current stage of progress in
            solving the puzzle.
          </li>
          <li>
            <strong>Display Status</strong>: User interface details, such as
            whether the user is focusing on a particular cell or viewing all
            solvable cells for a specific method.
          </li>
        </ul>
        <h3>The Analysis Process</h3>
        <p>
          Whenever the grid state is updated, <em>Dokku</em> performs a post
          update analysis so identify solveable cells and assign enough
          information to allow each cell to be rerendered
        </p>
        <ol>
          <li>
            <strong>Candidates are updated</strong>
            <ul>
              <li>
                The list of potential candidates for every cell and ennead is
                recalculated.
              </li>
            </ul>
          </li>
          <li>
            <strong>Solveable cells are identified</strong>
            <ul>
              <li>
                Cells that can be solved using Block, Column, or Row scanning
                methods are identified.
              </li>
              <li>
                Cells with only one single remaining valid candidate are flagged
                as solveable.
              </li>
            </ul>
          </li>
          <li>
            <strong>A Solveable Cells object is created</strong>
            <ul>
              <li>
                This is a summary of each solvable cell and the methods that can
                be used to solve it.
              </li>
            </ul>
          </li>
          <li>
            <strong>Cells are assigned a Display Analysis object</strong>
            <ul>
              <li>
                Each cell is assigned an object that dictates its visual
                presentation during rendering.
              </li>
              <li>
                The display properties are determined by:
                <ul>
                  <li>The current state of the cell.</li>
                  <li>The grid's display mode.</li>
                  <li>
                    The relationship between the cell and any selected (active)
                    cell.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Coding;
