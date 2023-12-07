import styles from './styles.module.scss';

export default function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <tr className={styles['table-row']}>
      {children}
    </tr>
  );
};