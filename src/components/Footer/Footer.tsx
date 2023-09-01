import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <a href="#" className={styles.footerLink}>
          <b>СКБ Контур</b> c 1988 года
        </a>
        <a href="#" className={styles.footerLink}>
          Правовые документы
        </a>
      </div>
    </footer>
  );
};
