'use client';

import styles from './MenuItem.module.css';

interface MenuItemProps {
  onClick?: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div onClick={onClick} className={styles.label}>
      {label}
    </div>
  );
};

export default MenuItem;
