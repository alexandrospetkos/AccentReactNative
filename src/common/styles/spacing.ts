import {Platform, StatusBar} from 'react-native';
const isIOS = (Platform.OS === 'ios');

export type Spacing = {
  TILE_HEIGHT: number;
  TILE_SMALL_HEIGHT: number;

  TOP_BAR_HEIGHT: number;
  TOP_BAR_MARGIN_TOP: number;
  
  PADDING_HORIZONTAL_GENERAL: number;
  PADDING_HORIZONTAL_20: number;
  PADDING_HORIZONTAL_24: number;

  // Design System.
  PADDING_SIZE_2: number;
  PADDING_SIZE_4: number;
  PADDING_SIZE_8: number;
  PADDING_SIZE_6: number;
  PADDING_SIZE_12: number;
  PADDING_SIZE_16: number;
  PADDING_SIZE_20: number;
  PADDING_SIZE_24: number;
  PADDING_SIZE_28: number;
  PADDING_SIZE_32: number;
  PADDING_SIZE_40: number;
  PADDING_SIZE_64: number;
  PADDING_SIZE_80: number;
  FONT_SIZE_8: number;
  FONT_SIZE_9: number;
  FONT_SIZE_10: number;
  FONT_SIZE_11: number;
  FONT_SIZE_12: number;
  FONT_SIZE_13: number;
  FONT_SIZE_14: number;
  FONT_SIZE_16: number;
  FONT_SIZE_18: number;
  FONT_SIZE_20: number;
  FONT_SIZE_22: number;
  FONT_SIZE_24: number;
  FONT_SIZE_26: number;
  FONT_SIZE_28: number;
  FONT_SIZE_32: number;
  FONT_SIZE_40: number;
  FONT_SIZE_48: number;
};

const SPACING: Spacing = {
  // New Styles.
  TILE_HEIGHT: isIOS ? 80 : 80,
  TILE_SMALL_HEIGHT: isIOS ? 64 : 56,

  TOP_BAR_HEIGHT: isIOS ? 40 : 40,
  TOP_BAR_MARGIN_TOP: isIOS ? 0 : StatusBar.currentHeight,

  PADDING_HORIZONTAL_GENERAL: 16,
  PADDING_HORIZONTAL_20: 20,
  PADDING_HORIZONTAL_24: 24,

  // Design System.
  PADDING_SIZE_2: isIOS ? 2 : 2,
  PADDING_SIZE_4: isIOS ? 4 : 4,
  PADDING_SIZE_6: isIOS ? 6 : 6,
  PADDING_SIZE_8: isIOS ? 8 : 8,
  PADDING_SIZE_12: isIOS ? 12 : 12,
  PADDING_SIZE_16: isIOS ? 16 : 16,
  PADDING_SIZE_20: isIOS ? 20 : 20,
  PADDING_SIZE_24: isIOS ? 24 : 24,
  PADDING_SIZE_28: isIOS ? 28 : 28,
  PADDING_SIZE_32: isIOS ? 32 : 32,
  PADDING_SIZE_40: isIOS ? 40 : 40,
  PADDING_SIZE_64: isIOS ? 64 : 64,
  PADDING_SIZE_80: isIOS ? 80 : 80,
  // Fonts
  FONT_SIZE_8: isIOS ? 9 : 8,
  FONT_SIZE_9: isIOS ? 10 : 9,
  FONT_SIZE_10: isIOS ? 11 : 10,
  FONT_SIZE_11: isIOS ? 12 : 11,
  FONT_SIZE_12: isIOS ? 13 : 12,
  FONT_SIZE_13: isIOS ? 14 : 13,
  FONT_SIZE_14: isIOS ? 15 : 14,
  FONT_SIZE_16: isIOS ? 17 : 16,
  FONT_SIZE_17: isIOS ? 18 : 17,
  FONT_SIZE_18: isIOS ? 19 : 18,
  FONT_SIZE_20: isIOS ? 20 : 20,
  FONT_SIZE_22: isIOS ? 22 : 22,
  FONT_SIZE_24: isIOS ? 24 : 24,
  FONT_SIZE_26: isIOS ? 26 : 26,
  FONT_SIZE_28: isIOS ? 28 : 28,
  FONT_SIZE_32: isIOS ? 32 : 32,
  FONT_SIZE_40: isIOS ? 40 : 40,
  FONT_SIZE_48: isIOS ? 48 : 48,
};

export default SPACING;
