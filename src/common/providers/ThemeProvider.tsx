import React from 'react';

import SPACING, {Spacing} from '../styles/spacing';

import {Colors_DS, lightTheme_DS} from '../colors/colors_ds';

export const ThemeContext = React.createContext();

export type Theme = {
  spacing: Spacing;
  colors_ds: Colors_DS;
};

const ThemeProvider = ({children}: React.ReactChild | React.ReactChild[]) => {
  const theme = {
    colors_ds: lightTheme_DS,
    spacing: SPACING
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
