import { PropsWithChildren } from 'react';
import { observer } from 'mobx-react';
import { ConfigProvider as AntDesignProvider, theme } from 'antd';
import { ThemeProvider as JssProvider } from 'react-jss';
import {
  getAntDesignTheme,
  getThemeByType,
  mediaQueries,
} from '~/presentation/styles/theme';
import { themeStore } from '~/presentation/styles/store';
import { useSyncWithSystemTheme } from '~/presentation/styles/hooks/useSyncWithSystemTheme';
import { JssTheme, ThemeType } from '~/presentation/styles/types';

export const StylesProvider = observer(({ children }: PropsWithChildren) => {
  useSyncWithSystemTheme();

  const antDesignTheme = {
    ...getAntDesignTheme(themeStore.resolvedTheme),
    algorithm:
      themeStore.resolvedTheme === ThemeType.Dark
        ? theme.darkAlgorithm
        : theme.defaultAlgorithm,
  };

  const jssTheme: JssTheme = {
    isDark: themeStore.resolvedTheme === ThemeType.Dark,
    theme: getThemeByType(themeStore.resolvedTheme),
    media: mediaQueries,
  };

  return (
    <AntDesignProvider theme={antDesignTheme}>
      <JssProvider theme={jssTheme}>{children}</JssProvider>
    </AntDesignProvider>
  );
});
