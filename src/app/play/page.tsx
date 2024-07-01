import Puzzle from '@/components/Puzzle';
import { customCells, loadCells } from '@/utils/cell';

export default function Play({
  searchParams: { puzzle, custom },
}: {
  searchParams: { puzzle: string; custom: string };
}) {
  const cells = custom ? customCells(custom) : loadCells(Number(puzzle));
  return <Puzzle initialCells={cells} initialStatus='auto' showCandidates />;
}
