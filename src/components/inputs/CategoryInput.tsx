'use client';

import styles from './CategoryInput.module.css';

import { IconType } from 'react-icons';

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={[
        styles.container,
        selected ? styles.selected : styles.notSelected,
      ].join(' ')}
    >
      <Icon size={30} />
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default CategoryInput;
