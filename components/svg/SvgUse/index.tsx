import styles from './styles.module.scss';

interface SvgUseProps extends React.SVGProps<SVGSVGElement> {
  href: string;
}

export default function SvgUse({ href, className }: SvgUseProps): JSX.Element {
  const sprite = require(`@/svg/${href}.svg?sprite`).default;
  
  return (
    <svg className={`${styles['svg-use']} ${className ?? ''}`} viewBox={sprite.viewBox} aria-hidden="true">
      <use href={`#${sprite.id}`} />
    </svg>
  );
};