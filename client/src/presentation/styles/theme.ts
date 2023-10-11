import type { ThemeConfig } from 'antd';
import { DEFAULT_THEME_TYPE } from '~/presentation/styles/config';
import { MediaQueries, Theme, ThemeType } from '~/presentation/styles/types';

export const THEME: {
  [key: string]: Theme;
} = {
  [ThemeType.Light]: {
    color: {
      primary: '#282828',
      primaryHover: '#3f3f3f',
      primaryBg: '#efefef',
      primaryBgHover: '#e4e4e4',
      text: '#282828',
      textInverted: '#eeeeee',
      gray1: '#f0f0f0',
      gray6: '#bfbfbf',
      gray7: '#949494',
      background: '#FFFFFF',
      backgroundInverted: '#0e0e0e',
    },
    borderRadiusBase: 4,
    borderRadiusMedium: 8,
  },
  [ThemeType.Dark]: {
    color: {
      primary: '#eeeeee',
      primaryHover: '#ffffff',
      primaryBg: '#3c3c3c',
      primaryBgHover: '#4d4d4d',
      text: '#eeeeee',
      textInverted: '#282828',
      gray1: '#313131',
      gray6: '#bfbfbf',
      gray7: '#949494',
      background: '#0e0e0e',
      backgroundInverted: '#FFFFFF',
    },
    borderRadiusBase: 4,
    borderRadiusMedium: 8,
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

export const mediaBreakpoints = {
  maxXs: `(max-width: ${SCREEN_BREAKPOINTS.screenXS}px)`,
  maxSm: `(max-width: ${SCREEN_BREAKPOINTS.screenSM}px)`,
  maxMd: `(max-width: ${SCREEN_BREAKPOINTS.screenMD}px)`,
  maxLg: `(max-width: ${SCREEN_BREAKPOINTS.screenLG}px)`,
};

export const mediaQueries: MediaQueries = {
  maxXs: `@media screen and ${mediaBreakpoints.maxXs}`,
  maxSm: `@media screen and ${mediaBreakpoints.maxSm}`,
  maxMd: `@media screen and ${mediaBreakpoints.maxMd}`,
  maxLg: `@media screen and ${mediaBreakpoints.maxLg}`,
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

      borderRadius: theme.borderRadiusBase,

      fontFamily: 'inherit',

      ...SCREEN_BREAKPOINTS,
    },
    components: {
      Input: {
        hoverBorderColor: theme.color.primary,
        activeBorderColor: theme.color.primary,
      },
      Button: {
        colorPrimary: theme.color.primary,
        colorLink: theme.color.primary,
        colorLinkHover: theme.color.primaryHover,
        colorLinkActive: theme.color.primary,
        primaryColor: theme.color.textInverted + ' !important',
        colorPrimaryHover: theme.color.primaryHover,
      },
      Checkbox: {
        colorWhite: theme.color.textInverted,
      },
    },
  };
}
