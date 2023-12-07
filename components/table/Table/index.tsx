import styles from './styles.module.scss';

export default function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles['table-wrapper']}>
      <table className={styles['table']}>
        {children}
      </table>
    </div>
  );
};