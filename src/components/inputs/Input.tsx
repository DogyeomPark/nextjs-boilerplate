'use client';

import styles from './Input.module.css';

import { z } from 'zod';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<z.infer<any>>;
  errors: FieldErrors;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className={styles.container}>
      {formatPrice && <BiDollar size={24} className={styles.dollarIcon} />}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=' '
        type={type}
        className={[
          styles.input,
          formatPrice && styles.inputPrice,
          errors[id] && styles.inputError,
        ].join(' ')}
      />
      <label
        className={[
          styles.label,
          formatPrice && styles.labelPrice,
          errors[id] && styles.labelError,
        ].join(' ')}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
