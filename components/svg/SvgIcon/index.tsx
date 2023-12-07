import SvgUse from '@/components/svg/SvgUse';
import styles from './styles.module.scss';

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  icon: string;
}

export default function SvgIcon({ icon, className }: SvgIconProps) {
  return (
    <SvgUse className={`${styles['svg-icon']} ${className ?? ''}`} href={`icons/${icon}`} />
  );
};