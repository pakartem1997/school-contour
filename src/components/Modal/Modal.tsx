import React from 'react';
import { clsx } from 'clsx';
import Close from '../../img/close.svg';
import styles from './Modal.module.css';

interface Props {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  width: React.CSSProperties['width'];
  cost?: number;
  enableCostInHeader?: boolean;
}

export const Modal: React.FC<Props> = ({ width, title, onClose, children, cost, enableCostInHeader }: Props) => {
  return (
    <div className={clsx(styles.modal, { [styles.modalActive]: true })} id="modal-card">
      <a href="#" className={styles.background} onClick={onClose}></a>
      <div style={{ width }} className={styles.content}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {enableCostInHeader && <span className={styles.titlePrice}>{`${cost} ₽/час`}</span>}
          <a href="#" onClick={onClose}>
            <Close />
          </a>
        </header>
        {children}
      </div>
    </div>
  );
};
