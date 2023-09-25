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

export const DEFAULT_THEME_TYPE = ThemeType.Light;

export const THEME_STORAGE_KEY = 'theme';
