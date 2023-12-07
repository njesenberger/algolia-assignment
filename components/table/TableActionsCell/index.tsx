import TableCell from '@/components/table/TableCell';
import styles from './styles.module.scss'

export default function TableActionsCell({ children }: {
  children: React.ReactNode 
}) {
  return (
    <TableCell>
      <div className={styles['table-actions-cell-content']}>
        {children}
      </div>
    </TableCell>
  );
}