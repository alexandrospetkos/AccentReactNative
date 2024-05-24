import {useContext} from 'react';
import {Theme, ThemeContext} from '../providers/ThemeProvider';

const useTheme = (): Theme | any => {
  return useContext(ThemeContext);
};

export default useTheme;
