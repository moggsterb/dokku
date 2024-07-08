'use client';

import { useRouter } from 'next/navigation';
import { EXAMPLES, LEVELS } from '@/utils/examples';
import styles from './Control.module.scss';

interface Props {
  id: number;
}

const ControlPreview = ({ id }: Props) => {
  const example = EXAMPLES.find((item) => item.id === id);
  const level = LEVELS.find((item) => item.id === example?.level);

  const router = useRouter();

  const backHandler = () => {
    router.push(`/selector/${level?.slug}`);
  };

  const playHandler = () => {
    router.push(`/play?puzzle=${id}`);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={backHandler}>back</button>
      <h1>Grid Preview</h1>
      <button onClick={playHandler}>play</button>
    </div>
  );
};

export default ControlPreview;
