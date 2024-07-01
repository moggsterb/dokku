import { GridActions } from '@/utils/grid';
import { ICell, IEnneads } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  cells: ICell[];
  enneads: IEnneads;
  showCandidates: boolean;
  // cellDispatch: Dispatch<CellAction>;
  gridDispatch: Dispatch<GridActions>;
  // setGridStatus: Dispatch<SetStateAction<string>>;
  // setShowCandidates: Dispatch<SetStateAction<boolean>>;
  updateCandidates: () => void;
}

const ControlPanel = ({
  cells,
  enneads,
  showCandidates,
  gridDispatch,
  // setShowCandidates,
  updateCandidates,
}: Props) => {
  return (
    <div>
      <button
        onClick={updateCandidates}
        style={{
          padding: 10,
        }}
      >
        Update Candidates
      </button>
      <button
        onClick={() => {
          const x = doScanning(cells, enneads);
          if (x) {
            gridDispatch({
              type: 'UPDATE_CELLS',
              payload: { cells: x },
            });
            // setGridStatus('solveable');
          }
        }}
        style={{
          padding: 10,
        }}
      >
        Find Suspects
      </button>

      <button
        onClick={() => {
          const x = setSuspects(cells);
          gridDispatch({
            type: 'UPDATE_CELLS',
            payload: { cells: x },
          });
        }}
        style={{
          padding: 10,
        }}
      >
        Solve Suspects
      </button>
    </div>
  );
};

export default ControlPanel;
