import Label from '@/components/Label';
import styles from './styles.module.scss';
import { useId } from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextField({ label, ...rest }: TextFieldProps) {
  const id = useId();

  return (
    <div className={styles['text-field']}>
      <Label htmlFor={id}>{label}</Label>
      <input className={styles['text-field-input']} id={id} {...rest} />
    </div>
  );
};