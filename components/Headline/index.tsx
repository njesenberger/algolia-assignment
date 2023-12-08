import styles from './styles.module.scss';

export default function Headline({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className={styles['headline-container']}>
    <h1 className="heading-1">{title}</h1>
    {children}
  </div>
  );
};