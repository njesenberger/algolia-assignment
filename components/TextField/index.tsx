import styles from './styles.module.scss';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

import { useId } from 'react';

export default function TextField({ label, ...rest }: TextFieldProps) {
  const id = useId();

  return (
    <div className={styles['text-field']}>
      <label className={styles['text-field-label']} htmlFor={id}>{label}</label>
      <input className={styles['text-field-input']} id={id} {...rest} />
    </div>
  );
};