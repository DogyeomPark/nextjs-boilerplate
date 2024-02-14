'use client';

import styles from './Counter.module.css';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className='title'>{title}</div>
        <div className='desc'>{subtitle}</div>
      </div>
      <div className={styles.counterContainer}>
        <div onClick={onReduce} className={styles.counter}>
          <AiOutlineMinus />
        </div>
        <div className={styles.value}>{value}</div>
        <div onClick={onAdd} className={styles.counter}>
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
