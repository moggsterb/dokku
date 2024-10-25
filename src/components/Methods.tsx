'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import styles from './Methods.module.scss';
import { ReactNode } from 'react';

const SubSection = ({
  children,
  type,
}: {
  children: ReactNode;
  type: string;
}) => {
  const { theme } = useTheme();

  return (
    <div className={styles.subsection}>
      <div className={styles.grab}>
        <Image
          src={
            theme === 'light'
              ? `/grabs/${type}-light.jpg`
              : `/grabs/${type}-dark.jpg`
          }
          alt='Block Scanning'
          width={'730'}
          height={'730'}
          layout='responsive'
          unoptimized
        />
      </div>

      {children}
    </div>
  );
};

const Methods = () => {
  return (
    <div className={styles.copyWrapper}>
      <div className={styles.copy}>
        <h1>Solve Methods</h1>
        <h2>
          How <em>Dokku</em> Solves Sudoku Puzzles
        </h2>

        <p className='extra'>
          <em>Dokku</em> is a sophisticated Sudoku solver that applies four key
          strategies simultaneously, allowing users to see in real time how many
          cells are solvable and which method can be used for each one.
        </p>

        <p>
          Here&apos;s how <em>Dokku</em> works in its current form:
        </p>

        <SubSection type='block'>
          <div>
            <h3>1. Block Scanning</h3>
            <p>
              <em>Dokku</em> constantly analyzes each 3x3 block, identifying
              missing numbers and narrowing down possible placements by
              cross-referencing intersecting rows and columns. Users can see
              which cells in each block can be solved based on this method,
              helping to visually track progress.
            </p>
          </div>
        </SubSection>

        <SubSection type='row'>
          <div>
            <h3>2. Row Scanning</h3>
            <p>
              At the same time, <em>Dokku</em> scans rows to find missing
              numbers, using the numbers already placed in intersecting columns
              and blocks to eliminate invalid options. <em>Dokku</em> provides a
              clear view of how many cells in each row can be solved using this
              technique, giving users a live status of solvable cells.
            </p>
          </div>
        </SubSection>

        <SubSection type='column'>
          <div>
            <h3>3. Column Scanning</h3>
            <p>
              Simultaneously, <em>Dokku</em> applies the same process to
              columns, identifying solvable cells by checking the row and block
              constraints for each number. Users can track how many cells in
              each column are ready to be filled based on column scanning,
              combining information from all scanning strategies.
            </p>
          </div>
        </SubSection>

        <SubSection type='single'>
          <div>
            <h3>4. Single Candidate</h3>
            <p>
              While scanning rows, columns, and blocks, <em>Dokku</em> is also
              continuously identifying single candidates—cells where only one
              number can fit based on the current state of the grid. These cells
              are immediately flagged as solvable, and users can see how many of
              these single candidates are available at any given moment.
            </p>
          </div>
        </SubSection>

        <h3>A Dynamic, Simultaneous Approach</h3>
        <p>
          <em>Dokku</em> doesn’t apply these strategies one at a time—it works
          dynamically, using all four techniques at once to solve as many cells
          as possible. Users can watch as <em>Dokku</em> highlights solvable
          cells and explains which method can be used, creating an engaging and
          transparent solving experience.
        </p>

        <p>
          This approach is highly effective for many puzzles, but some more
          complex grids require additional strategies beyond these four.
        </p>

        <hr />

        <h2>The Next Phase: Advanced Solving Techniques</h2>

        <p>
          While these four strategies are highly effective for a wide range of
          puzzles, some more challenging Sudoku grids require more complex
          methods to fully solve. In future iterations, <em>Dokku</em> could
          expand its capabilities to include these advanced techniques:
        </p>

        <h3>
          1. <strong>Naked and Hidden Pairs/Triples</strong>
        </h3>
        <p>
          These techniques involve identifying pairs or triples of numbers that
          must go in a certain group of cells within a row, column, or block.
        </p>

        <ul>
          <li>
            <strong>Naked Pairs/Triples</strong>: If two (or three) cells in a
            row, column, or block can only hold the same two (or three) numbers,
            other numbers can be eliminated from those cells, helping to narrow
            down possibilities.
          </li>
          <li>
            <strong>Hidden Pairs/Triples</strong>: When two (or three) numbers
            can only fit in certain cells within a group, even if those cells
            have other candidates, these numbers can be locked in, allowing
            further eliminations.
          </li>
        </ul>

        <h3>
          2. <strong>Pointing Pairs</strong>
        </h3>
        <p>
          This method involves looking for numbers that are restricted to two
          cells in a row or column within a block. If those two cells are in the
          same row or column, the number can be eliminated from that row or
          column outside the block.
        </p>

        <h3>
          3. <strong>X-Wing</strong>
        </h3>
        <p>
          The X-Wing technique focuses on pairs of candidates that appear in the
          same two columns (or rows) in two different rows (or columns). When
          this pattern occurs, the number can be eliminated from other positions
          in those columns or rows, unlocking further possibilities.
        </p>

        <h3>
          4. <strong>Swordfish</strong>
        </h3>
        <p>
          A more complex version of X-Wing, Swordfish deals with three rows and
          three columns where a number appears in exactly three cells across
          each. This allows eliminations similar to X-Wing but on a larger
          scale.
        </p>

        <h3>
          5. <strong>Guessing Techniques (e.g., Trial and Error)</strong>
        </h3>
        <p>
          When logic-based methods run out of clear moves, some solvers resort
          to guessing techniques such as <strong>backtracking</strong> or{' '}
          <strong>bifurcation</strong>. In these methods, <em>Dokku</em> could
          try placing a candidate in a cell and see if it leads to a valid
          solution. If not, it can backtrack and try another option.
        </p>

        <hr />

        <p className='extra'>
          By rolling out these more advanced techniques in the future,
          <em>Dokku</em> could evolve into an even more powerful solver,
          tackling even the most complex and challenging puzzles with ease.
        </p>
      </div>
    </div>
  );
};

export default Methods;
