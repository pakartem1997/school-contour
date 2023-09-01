import React, { useEffect } from 'react';
import styles from './SwitchTheme.module.css';
import { useTheme } from '../../helpers/useTheme';

export const SwitchTheme = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTheme(e.target.checked ? 'dark' : 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.toggleSwitch}>
      <label className={styles.label}>
        <input className={styles.input} type="checkbox" onChange={handleChange} checked={theme === 'dark'} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
