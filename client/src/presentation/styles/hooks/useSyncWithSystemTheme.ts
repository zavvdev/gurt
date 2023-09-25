import { useEffect } from 'react';
import { ThemeType } from '~/presentation/styles/types';
import { themeStore } from '~/presentation/styles/store';

export function useSyncWithSystemTheme() {
  useEffect(() => {
    const mql =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

    const mqlListener = (e: MediaQueryListEvent) => {
      if (themeStore.theme === ThemeType.System) {
        themeStore.setResolvedTheme(
          e.matches ? ThemeType.Dark : ThemeType.Light,
        );
      }
    };

    if (mql) {
      mql.addEventListener('change', mqlListener);
    }

    return () => mql && mql.removeEventListener('change', mqlListener);
  }, []);
}
