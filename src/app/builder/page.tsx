import MainContainer from '@/components/MainContainer';
import Puzzle from '@/components/Puzzle';
import { initialCells, loadCells } from '@/utils/cell';

export default function Builder() {
  return (
    <MainContainer>
      <Puzzle
        initialCells={initialCells()}
        initialStatus={'builder'}
        showCandidates={true}
      />
    </MainContainer>
  );
}
