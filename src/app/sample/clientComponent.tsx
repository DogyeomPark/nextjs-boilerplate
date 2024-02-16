'use client';

import { useState } from 'react';

import Button from '@/components/button';

import styles from './clientComponent.module.css';

const ClientComponent: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <Button
        label='increase'
        onClick={() => setCount((prev) => (prev += 1))}
      />
      <div>{count}</div>
    </div>
  );
};

export default ClientComponent;
