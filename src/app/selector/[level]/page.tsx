import Grid from '@/components/Grid';
import { initialCells, loadCells } from '@/utils/cell';
import { examples } from '@/utils/examples';

export default function Selector({
  params: { level },
}: {
  params: { level: string };
}) {
  const levelID = ['easy', 'normal', 'difficult', 'expert'].indexOf(level);

  const grids = examples.filter((item) => item.level === levelID);

  return (
    <main className='two-col'>
      <div className='grid-container'>
        <h1>{level}</h1>
        {grids.map((grid, index) => (
          <Grid key={index} initialCells={loadCells(grid.id)} />
        ))}
      </div>
      <div className='extra-container'></div>
    </main>
  );
}
