import React from 'react';
type Theme = 'dark' | 'light';

export const ThemeContext = React.createContext<
  | {
      theme: Theme;
      setTheme: (theme: Theme) => void;
    }
  | undefined
>(undefined);
