import Grid from '@/components/Grid';
import Image from 'next/image';
// import styles from './page.module.css';

export default function Home() {
  return (
    <main className='two-col'>
      <div className='grid-container'>
        <Grid />
        <div className='selector'></div>
      </div>
      <div className='extra-container'></div>
    </main>
  );
}
