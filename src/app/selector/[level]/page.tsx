'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { initialGrid } from '@/utils/grid';
import { loadCells } from '@/utils/cell';
import { EXAMPLES, LEVELS } from '@/utils/examples';

import MainContainer from '@/components/Layout/MainContainer';
import AnimReveal from '@/components/Layout/AnimReveal';
import Portal from '@/components/Layout/Portal';
import DokkuGrid from '@/components/Sudoku/DokkuGrid';
import Control from '@/components/Controls/Control';
import { GridStatus } from '@/utils/types';

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

  return (
    <>
      <MainContainer>
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
                    <DokkuGrid
                      grid={initialGrid(
                        GridStatus.SELECTOR,
                        loadCells(grid.id)
                      )}
                      showHints={false}
                    />
                  </div>
                ),
              };
            })}
          />
        </div>
      </MainContainer>
      <Portal type='header'>
        <Control
          banner={{
            title: `${levelObj.title} Puzzles`,
            description: levelObj.description,
          }}
        />
      </Portal>
      <Portal type='footer'>
        <Control
          beforeActions={[
            { title: `${prevOBJ?.title}`, url: `${prevOBJ?.url}` },
          ]}
          afterActions={[
            { title: `${nextOBJ?.title}`, url: `${nextOBJ?.url}` },
          ]}
        />
      </Portal>
    </>
  );
}
