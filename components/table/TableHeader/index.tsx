import styles from './styles.module.scss';

export default function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className={styles['table-header']}>
      <tr>
        {children}
      </tr>
    </thead>
  );
};