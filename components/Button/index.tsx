import styles from './styles.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export default function Button({ color = 'primary', children, ...rest }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[`color-${color}`]}`} type="button" {...rest}>
      {children}
    </button>
  );
}