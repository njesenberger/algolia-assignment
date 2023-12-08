import styles from './styles.module.scss';

export default function Label({ children, htmlFor }: {
  children: React.ReactNode,
  htmlFor: string,
}) {
  return (
    <label className={styles['label']} htmlFor={htmlFor}>
      {children}
    </label>
  );
}