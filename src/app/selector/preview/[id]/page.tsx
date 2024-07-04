import Puzzle from '@/components/Puzzle';
import MainContainer from '@/components/MainContainer';
import { loadCells } from '@/utils/cell';
import ControlPreview from '@/components/ControlPreview';

export default function Preview({
  params: { id },
}: {
  params: { id: string };
}) {
  const header = <ControlPreview id={Number(id)} />;
  return (
    <MainContainer header={header}>
      <Puzzle initialCells={loadCells(Number(id))} initialStatus='preview' />
    </MainContainer>
  );
}
