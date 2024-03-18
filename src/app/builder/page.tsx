import Grid from '@/components/Grid';
import { initialCells, loadCells } from '@/utils/cell';

export default function Builder() {
  return (
    <main className='two-col'>
      <div className='grid-container'>
        <Grid initialCells={initialCells()} />
        {/* <Grid initialCells={loadCells(1)} /> */}
      </div>
      <div className='extra-container'></div>
    </main>
  );
}
