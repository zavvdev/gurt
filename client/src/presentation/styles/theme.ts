import type { ThemeConfig } from 'antd';
import {
  DEFAULT_THEME_TYPE,
  Theme,
  ThemeType,
} from '~/presentation/styles/config';

export const THEME: {
  [key: string]: Theme;
} = {
  [ThemeType.Light]: {
    color: {
      primary: '#1F81F8',
      primaryHover: '#3791ff',
      primaryBg: '#EBF4FF',
      primaryBgHover: '#e4effe',
      text: '#282828',
      gray6: '#bfbfbf',
      background: '#FFFFFF',
    },
    borderRadius: 4,
  },
  [ThemeType.Dark]: {
    color: {
      primary: '#1F81F8',
      primaryHover: '#3791ff',
      primaryBg: '#313131',
      primaryBgHover: '#343434',
      text: '#E3E3E3',
      gray6: '#bfbfbf',
      background: '#191919',
    },
    borderRadius: 4,
  },
};

export function getThemeByType(type: ThemeType) {
  return THEME?.[type] || THEME[DEFAULT_THEME_TYPE];
}

export function getAntDesignTheme(type: ThemeType): ThemeConfig {
  const theme = getThemeByType(type);
  return {
    token: {
      colorPrimary: theme.color.primary,
      colorPrimaryHover: theme.color.primaryHover,
      colorPrimaryBg: theme.color.primaryBg,
      colorPrimaryBgHover: theme.color.primaryBgHover,

      colorText: theme.color.text,

      borderRadius: theme.borderRadius,

      fontFamily: 'inherit',
    },
  };
}
