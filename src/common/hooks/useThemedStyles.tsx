import useTheme from './useTheme';
import {TextStyle, ViewStyle} from 'react-native';

const useThemedStyles = (
  styles: (theme: ViewStyle | TextStyle | any) => any,
) => {
  const theme = useTheme();
  return styles(theme);
};

export default useThemedStyles;
