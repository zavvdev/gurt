import { useEffect } from 'react';
import { usePersistedState } from '~/core/utilities/hooks/usePersistedState';
import { useSystemTheme } from '~/presentation/utilities/hooks/useSystemTheme';

const THEME_KEY = 'theme';
const DARK_THEME_CLASS = 'dark';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
  System = 'system',
}

export function useThemeSwitch() {
  const systemTheme = useSystemTheme();
  const [theme, setTheme] = usePersistedState(THEME_KEY, Theme.Light);

  const applyDark = () => {
    document.documentElement.classList.add(DARK_THEME_CLASS);
  };

  const applyLight = () => {
    document.documentElement.classList.remove(DARK_THEME_CLASS);
  };

  useEffect(() => {
    const switchIf = (isDark: boolean) => {
      isDark ? applyDark() : applyLight();
    };
    if (theme === Theme.System) {
      switchIf(systemTheme === 'dark');
    } else {
      switchIf(theme === Theme.Dark);
    }
  }, [theme, systemTheme]);

  return {
    theme,
    setTheme,
  };
}
