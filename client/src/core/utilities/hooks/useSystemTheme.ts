import { useEffect, useState } from 'react';

export type SystemTheme = 'dark' | 'light';

const getMql = () => {
  if (typeof window === 'undefined') {
    return;
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
};

const getSystemTheme = (matches: boolean) => (matches ? 'dark' : 'light');

const getDefaultTheme = (isSSR: boolean): SystemTheme => {
  if (!isSSR) {
    const mql = getMql();
    if (mql) {
      return getSystemTheme(mql.matches);
    }
  }
  return 'light';
};

export function useSystemTheme(isSSR: boolean = false) {
  const defaultTheme = getDefaultTheme(isSSR);
  const [systemTheme, setSystemTheme] = useState<SystemTheme>(defaultTheme);

  useEffect(() => {
    const mql = getMql();

    const mqlListener = (e: MediaQueryListEvent) => {
      return setSystemTheme(getSystemTheme(e.matches));
    };

    if (mql) {
      setSystemTheme(getSystemTheme(mql.matches));
      mql.addEventListener('change', mqlListener);
    }

    return () => mql && mql.removeEventListener('change', mqlListener);
  }, []);

  return systemTheme;
}
