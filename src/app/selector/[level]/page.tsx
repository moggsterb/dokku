'use client';

import Puzzle from '@/components/Puzzle';
import MainContainer from '@/components/MainContainer';
import { loadCells } from '@/utils/cell';
import { examples } from '@/utils/examples';
import { useRouter } from 'next/navigation';
import Grid from '@/components/Grid';
import { initialGrid } from '@/utils/grid';
import AnimReveal from '@/components/AnimReveal';
import ControlSelector from '@/components/ControlSelector';

export default function Selector({
  params: { level },
}: {
  params: { level: string };
}) {
  const router = useRouter();

  const levelID = ['easy', 'normal', 'difficult', 'expert'].indexOf(level);
  const grids = examples.filter((item) => item.level === levelID);
  const capLevel = level.charAt(0).toUpperCase() + level.slice(1);

  const header = <ControlSelector title={`${capLevel} Puzzles`} />;

  return (
    <MainContainer header={header}>
      <div className='selector'>
        <AnimReveal
          items={grids.map((grid, index) => {
            return {
              initX: 0,
              initOpacity: 0,
              component: (
                <div
                  className={`selector-block block-${index}`}
                  key={index}
                  onClick={() => {
                    router.push(`/selector/preview/${grid.id}`);
                  }}
                >
                  <Grid grid={initialGrid('selector', loadCells(grid.id))} />
                </div>
              ),
            };
          })}
        />
      </div>
    </MainContainer>
  );
}
