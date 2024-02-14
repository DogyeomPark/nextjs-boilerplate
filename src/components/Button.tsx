'use client';

import { IconType } from 'react-icons/lib';

import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        styles.button,
        outline && styles.outline,
        small && styles.small,
      ].join(' ')}
    >
      {Icon && <Icon size={24} className={styles.icon} />}
      {label}
    </button>
  );
};

export default Button;
