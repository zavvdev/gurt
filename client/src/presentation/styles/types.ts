export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export interface Theme {
  color: {
    primary: string;
    primaryHover: string;
    primaryBg: string;
    primaryBgHover: string;
    text: string;
    textInverted: string;
    gray1: string;
    gray6: string;
    background: string;
    backgroundInverted: string;
  };
  borderRadiusBase: number;
  borderRadiusMedium: number;
}

export interface MediaQueries {
  maxXs: string;
  maxSm: string;
  maxMd: string;
  maxLg: string;
}

export interface JssTheme {
  isDark: boolean;
  theme: Theme;
  media: MediaQueries;
}
