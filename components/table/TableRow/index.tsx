import styles from './styles.module.scss';

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export default function TableRow({ children, ...rest }: TableRowProps) {
  return (
    <tr className={styles['table-row']} {...rest}>
      {children}
    </tr>
  );
};