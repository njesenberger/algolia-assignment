import SvgIcon from '@/components/svg/SvgIcon';
import styles from './styles.module.scss';

interface TableIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
}

export default function TableIconButton({ icon, label, ...rest }: TableIconButtonProps) {
  return (
    <button className={styles['table-icon-button']} type="button" {...rest}>
      <SvgIcon icon={icon} />
      <span className="visually-hidden">{label}</span>
    </button>
  );
}