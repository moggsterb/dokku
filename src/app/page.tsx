import Grid from '@/components/Grid';
import { initialCells, loadCells } from '@/utils/cell';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='two-col'>
      <div className='grid-container'>
        {/* <Grid initialCells={loadCells(3)} /> */}
        {/* <Grid initialCells={initialCells()} /> */}
        <h1>Dokku</h1>
        <Link href='/selector/easy'>Easy</Link>
        <Link href='/selector/normal'>Normal</Link>
        <Link href='/selector/difficult'>Difficult</Link>
        <Link href='/selector/expert'>Expert</Link>
        <Link href='/builder'>Create Your Own Puzzle</Link>
      </div>
      <div className='extra-container'></div>
    </main>
  );
}
