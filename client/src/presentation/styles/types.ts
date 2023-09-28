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
    gray6: string;
    background: string;
  };
  borderRadius: number;
}

export interface MediaBreakpoints {
  maxXs: string;
  maxSm: string;
  maxMd: string;
  maxLg: string;
}

export interface JssTheme {
  isDark: boolean;
  theme: Theme;
  media: MediaBreakpoints;
}
