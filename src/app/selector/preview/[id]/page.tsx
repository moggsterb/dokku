import Puzzle from '@/components/Puzzle';
import MainContainer from '@/components/MainContainer';
import { loadCells } from '@/utils/cell';
import Link from 'next/link';

export default function Preview({
  params: { id },
}: {
  params: { id: string };
}) {
  const header = (
    <div>
      <h1 style={{ textAlign: 'center' }}>Preview</h1>
      <Link href={`/play?puzzle=${id}`}>Back</Link>
      <Link href={`/play?puzzle=${id}`}>Play This Grid</Link>
    </div>
  );
  return (
    <MainContainer header={header}>
      <Puzzle initialCells={loadCells(Number(id))} initialStatus='preview' />
    </MainContainer>
  );
}
