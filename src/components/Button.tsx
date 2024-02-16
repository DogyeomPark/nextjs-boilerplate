'use client';

import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
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
      {label}
    </button>
  );
};

export default Button;
