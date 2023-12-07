import styles from './styles.module.scss';

export default function TableCell({ alignEnd, children }: {
  alignEnd?: boolean,
  children: React.ReactNode 
}) {
  return (
    <td className={`${styles['table-cell']} ${alignEnd ? styles['align-end'] : ''}`}>
      {children}
    </td>
  );
};