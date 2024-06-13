import Puzzle from '@/components/Puzzle';
import { initialCells, loadCells } from '@/utils/cell';

export default function Builder() {
  return <Puzzle initialCells={initialCells()} initialStatus={'builder'} />;
}
