'use client';

import { useRouter } from 'next/navigation';
import { examples } from '@/utils/examples';
import styles from './Control.module.scss';

interface Props {
  id: number;
}

const ControlPreview = ({ id }: Props) => {
  const example = examples.find((item) => item.id === id);
  const level = ['easy', 'normal', 'difficult', 'expert'][example?.level || 0];

  const router = useRouter();

  const backHandler = () => {
    router.push(`/selector/${level}`);
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
