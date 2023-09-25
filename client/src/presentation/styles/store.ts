import { action, makeObservable, observable } from 'mobx';
import {
  getPersistedData,
  persistData,
} from '~/application/utilities/storages';
import {
  DEFAULT_THEME_TYPE,
  THEME_STORAGE_KEY,
  ThemeType,
} from '~/presentation/styles/config';

class ThemeStore {
  theme: ThemeType = DEFAULT_THEME_TYPE;
  resolvedTheme: ThemeType.Dark | ThemeType.Light = DEFAULT_THEME_TYPE;

  constructor() {
    makeObservable(this, {
      theme: observable,
      resolvedTheme: observable,
      setTheme: action,
      setResolvedTheme: action,
    });

    const storedTheme = getPersistedData(THEME_STORAGE_KEY) as ThemeType;

    this.theme = storedTheme || DEFAULT_THEME_TYPE;

    this.resolvedTheme =
      storedTheme === ThemeType.System ? this.getSystemTheme() : storedTheme;
  }

  getSystemTheme() {
    const mql =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    return mql.matches ? ThemeType.Dark : ThemeType.Light;
  }

  setTheme(nextTheme: ThemeType) {
    this.setResolvedTheme(nextTheme);
    persistData(THEME_STORAGE_KEY, nextTheme);
    this.theme = nextTheme;
  }

  setResolvedTheme(nextTheme: ThemeType) {
    this.resolvedTheme =
      nextTheme === ThemeType.System ? this.getSystemTheme() : nextTheme;
  }
}

export const themeStore = new ThemeStore();
