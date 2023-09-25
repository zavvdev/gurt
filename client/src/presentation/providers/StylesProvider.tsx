import { PropsWithChildren } from 'react';
import { observer } from 'mobx-react';
import { ConfigProvider as AntDesignProvider, theme } from 'antd';
import { ThemeProvider as JssProvider } from 'react-jss';
import { getAntDesignTheme, getThemeByType } from '~/presentation/styles/theme';
import { themeStore } from '~/presentation/styles/store';
import { ThemeType } from '~/presentation/styles/config';
import { useSyncWithSystemTheme } from '~/presentation/styles/hooks/useSyncWithSystemTheme';

export const StylesProvider = observer(({ children }: PropsWithChildren) => {
  useSyncWithSystemTheme();
  return (
    <AntDesignProvider
      theme={{
        ...getAntDesignTheme(themeStore.resolvedTheme),
        algorithm:
          themeStore.resolvedTheme === ThemeType.Dark
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <JssProvider theme={getThemeByType(themeStore.resolvedTheme)}>
        {children}
      </JssProvider>
    </AntDesignProvider>
  );
});
