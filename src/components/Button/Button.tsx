import React from 'react';
import { clsx } from 'clsx';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  light?: boolean;
  wide?: boolean;
  large?: boolean;
  link?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ disabled, className, onClick, link, children, light, wide, large }) => {
  const handleClick = () => {
    if (disabled || !onClick) {
      return;
    }
    onClick();
  };

  return (
    <a
      className={clsx(className, styles.button, {
        [styles.disabled]: disabled,
        [styles.light]: light,
        [styles.wide]: wide,
        [styles.large]: large,
        [styles.link]: link,
      })}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};
