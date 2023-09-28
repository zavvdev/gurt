import type { ThemeConfig } from 'antd';
import { DEFAULT_THEME_TYPE } from '~/presentation/styles/config';
import {
  MediaBreakpoints,
  Theme,
  ThemeType,
} from '~/presentation/styles/types';

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
      text: '#eeeeee',
      gray6: '#bfbfbf',
      background: '#0e0e0e',
    },
    borderRadius: 4,
  },
};

export const SCREEN_BREAKPOINTS = {
  screenXXL: 1600,
  screenXXLMin: 1600,

  screenXL: 1200,
  screenXLMax: 1599,
  screenXLMin: 1200,

  screenLG: 992,
  screenLGMax: 1199,
  screenLGMin: 992,

  screenMD: 768,
  screenMDMax: 991,
  screenMDMin: 768,

  screenSM: 576,
  screenSMMax: 767,
  screenSMMin: 576,

  screenXS: 480,
  screenXSMax: 575,
  screenXSMin: 480,
};

export const mediaBreakpoints: MediaBreakpoints = {
  maxXs: `@media screen and (max-width: ${SCREEN_BREAKPOINTS.screenXS}px)`,
  maxSm: `@media screen and (max-width: ${SCREEN_BREAKPOINTS.screenSM}px)`,
  maxMd: `@media screen and (max-width: ${SCREEN_BREAKPOINTS.screenMD}px)`,
  maxLg: `@media screen and (max-width: ${SCREEN_BREAKPOINTS.screenLG}px)`,
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
      colorPrimaryText: theme.color.primary,
      colorPrimaryTextHover: theme.color.primaryHover,

      colorText: theme.color.text,

      borderRadius: theme.borderRadius,

      fontFamily: 'inherit',

      ...SCREEN_BREAKPOINTS,
    },
    components: {
      Input: {
        hoverBorderColor: theme.color.primary,
        activeBorderColor: theme.color.primary,
      },
    },
  };
}
