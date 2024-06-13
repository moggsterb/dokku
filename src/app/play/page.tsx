import Puzzle from '@/components/Puzzle';
import { loadCells } from '@/utils/cell';

export default function Play({
  searchParams: { puzzle },
}: {
  searchParams: { puzzle: string };
}) {
  const id = puzzle;
  return (
    <Puzzle
      initialCells={loadCells(Number(id))}
      initialStatus='ready'
      showCandidates
    />
  );
}
