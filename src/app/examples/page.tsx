'use client';

import Cell from '@/components/Cell';
import MainContainer from '@/components/MainContainer';
import { IDisplayCellProps } from '@/utils/display';

export default function Examples() {
  const basicCell: IDisplayCellProps = {
    id: 1,
    row: 1,
    column: 1,
    block: 1,
    status: 'unsolved',
    value: 0,
    candidates: [],
    solution: [],
    trioRow: 1,
    trioColumn: 1,

    hasValue: false,
    gridStatus: 'preview',
    canActivate: false,
    isActive: false,
    inActiveBlock: false,
    inActiveColumn: false,
    inActiveRow: false,
  };
  return (
    <MainContainer header={<h1>Examples</h1>}>
      <div>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>cell</th>
              <th>unsolved</th>
              <th>preset</th>
              <th>solved</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>inactive</td>
              <td>
                <Cell displayCell={{ ...basicCell, id: 1 }} />
              </td>
              <td>
                <Cell
                  displayCell={{
                    ...basicCell,
                    id: 1,
                    hasValue: true,
                    value: 6,
                    status: 'preset',
                  }}
                />
              </td>
              <td>
                <Cell
                  displayCell={{
                    ...basicCell,
                    id: 1,
                    hasValue: true,
                    value: 6,
                  }}
                />
              </td>
            </tr>

            <tr>
              <td>active</td>
              <td>
                <Cell
                  displayCell={{
                    ...basicCell,
                    id: 1,
                    isActive: true,
                    canActivate: true,
                  }}
                  clickHandler={() => null}
                />
              </td>
              <td>
                <Cell
                  displayCell={{
                    ...basicCell,
                    id: 1,
                    hasValue: true,
                    value: 6,
                    isActive: true,
                    canActivate: true,
                    status: 'preset',
                  }}
                  clickHandler={() => null}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainContainer>
  );
}
