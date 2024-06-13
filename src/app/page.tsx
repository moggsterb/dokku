import MainContainer from '@/components/MainContainer';
import Link from 'next/link';

export default function Home() {
  const header = <h1 style={{ textAlign: 'center' }}>Dokku</h1>;
  return (
    <MainContainer header={header}>
      <div className='grid'>
        <ul>
          <li>
            <Link href='/selector/easy'>Easy</Link>
          </li>
          <li>
            <Link href='/selector/normal'>Normal</Link>
          </li>
          <li>
            <Link href='/selector/difficult'>Difficult</Link>
          </li>
          <li>
            <Link href='/selector/expert'>Expert</Link>
          </li>
          <li>
            <Link href='/builder'>Create Your Own Puzzle</Link>
          </li>
        </ul>
      </div>
    </MainContainer>
  );
}
