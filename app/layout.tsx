import type { Metadata } from 'next';
import '@/styles/styles.scss';
import styles from './layout.module.scss';
import ThemeButton from '@/components/ThemeButton';

export const metadata: Metadata = {
  title: 'Algolia Assignment — Nicolas Jesenberger',
  description: 'Algolia Assignment by Nicolas Jesenberger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={styles['body']}>
        {children}
        <ThemeButton />
      </body>
    </html>
  )
}
