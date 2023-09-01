import React from 'react';
import styles from './Dropdown.module.css';

interface WrapperProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const Wrapper = ({ title, children }: WrapperProps) => {
  return (
    <div className={styles.dropdown} tabIndex={0}>
      <div className={styles.title}>{title}</div>
      <div className={styles.menu}>{children}</div>
    </div>
  );
};

interface ItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Item = ({ children, onClick }: ItemProps) => {
  return (
    <a className={styles.item} onClick={onClick}>
      {children}
    </a>
  );
};

export const Dropdown = { Wrapper, Item };
