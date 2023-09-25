import type { ThemeConfig } from 'antd';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

interface ThemeNode {
  color: {
    primary: string;
    primaryHover: string;
    primaryBg: string;
    primaryBgHover: string;
    text: string;
    gray6: string;
  };
  borderRadius: number;
}

export const THEME: {
  [key: string]: ThemeNode;
} = {
  [Theme.Light]: {
    color: {
      primary: '#1F81F8',
      primaryHover: '#3791ff',
      primaryBg: '#EBF4FF',
      primaryBgHover: '#e4effe',
      text: '#282828',
      gray6: '#bfbfbf',
    },
    borderRadius: 4,
  },
  [Theme.Dark]: {
    color: {
      primary: '#1F81F8',
      primaryHover: '#3791ff',
      primaryBg: '#313131',
      primaryBgHover: '#343434',
      text: '#E3E3E3',
      gray6: '#bfbfbf',
    },
    borderRadius: 4,
  },
};

export function getAntDesignTheme(type: Theme | string): ThemeConfig {
  const theme = THEME?.[type as Theme] || THEME.light;
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

// export function useAppTheme(): ThemeNode {
//   const { theme } = useTheme();
//   return THEME?.[theme as Theme] || THEME[Theme.Light];
// }
