import Control from '@/components/Control';
import MainContainer from '@/components/MainContainer';
import Puzzle from '@/components/Puzzle';
import { initialCells, loadCells } from '@/utils/cell';

export default function Builder() {
  const header = (
    <Control
      banner={{
        title: 'Create your own Grid',
        description: 'Enter your own puzzle and DOKKU will help you solve it',
      }}
    />
  );

  return (
    <MainContainer header={header}>
      <Puzzle
        initialCells={initialCells()}
        initialStatus={'builder'}
        showCandidates={false}
      />
    </MainContainer>
  );
}
