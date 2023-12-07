import styles from './styles.module.scss';

export default function TableHeaderCell({ alignEnd, children }: {
  alignEnd?: boolean,
  children: React.ReactNode 
}) {
  return (
    <th className={`${styles['table-header-cell']} ${alignEnd ? styles['align-end'] : ''}`}>
      {children}
    </th>
  );
};