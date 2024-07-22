'use client';

import MainContainer from '@/components/MainContainer';
import { loadCells } from '@/utils/cell';
import { EXAMPLES, LEVELS } from '@/utils/examples';
import { useRouter } from 'next/navigation';
import Grid from '@/components/Grid';
import { initialGrid } from '@/utils/grid';
import AnimReveal from '@/components/AnimReveal';
import Control from '@/components/Control';

export default function Selector({
  params: { level },
}: {
  params: { level: string };
}) {
  const router = useRouter();

  const levelObj = LEVELS.find((item) => item.url === `/selector/${level}`);
  if (!levelObj) return <>Level Not found</>;

  const levelID = levelObj?.id || 0;

  const grids = EXAMPLES.filter((item) => item.level === levelID);

  const prevOBJ = LEVELS.find(
    (item) => item.id === (levelID === 1 ? 5 : levelID - 1)
  );

  const nextOBJ = LEVELS.find(
    (item) => item.id === (levelID === 5 ? 1 : levelID + 1)
  );

  const header = (
    <Control
      title={`${levelObj.title} Puzzles`}
      description={levelObj.description}
      // beforeActions={[{ title: `${prevOBJ?.title}`, url: `${prevOBJ?.url}` }]}
      // afterActions={[{ title: `${nextOBJ?.title}`, url: `${nextOBJ?.url}` }]}
    />
  );

  const footer = (
    <Control
      title=''
      description=''
      beforeActions={[{ title: `${prevOBJ?.title}`, url: `${prevOBJ?.url}` }]}
      afterActions={[{ title: `${nextOBJ?.title}`, url: `${nextOBJ?.url}` }]}
    />
  );

  return (
    <MainContainer header={header} footer={footer}>
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
                  <Grid
                    grid={initialGrid('selector', loadCells(grid.id))}
                    showHints={false}
                  />
                </div>
              ),
            };
          })}
        />
      </div>
    </MainContainer>
  );
}
