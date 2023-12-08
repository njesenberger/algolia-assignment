'use client';

import SvgIcon from '@/components/svg/SvgIcon';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

export default function ThemeButton() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    console.log({ currentTheme })
    if (currentTheme) {
      if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme-dark', '');
      }
      setTheme(currentTheme);
    } else {
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (userPrefersDark) {
        document.documentElement.setAttribute('data-theme-dark', '');
        setTheme('dark');
      }
    }
  }, []);

  const ToggleTheme = () => {
    document.documentElement.toggleAttribute('data-theme-dark');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return (
    <button className={styles['theme-button']} onClick={ToggleTheme} type="button">
      <SvgIcon icon={theme === 'light' ? 'moon' : 'sun'} />
      <span className="visually-hidden">Toggle theme</span>
    </button>
  );
}
