import { PropsWithChildren } from 'react';
import { ConfigProvider, theme } from 'antd';
import { getAntDesignTheme, Theme } from '~/presentation/styles/theme';

export function AntDesignProvider({ children }: PropsWithChildren) {
  const currentTheme = 'light';
  return (
    <ConfigProvider
      theme={{
        ...getAntDesignTheme(currentTheme as Theme),
        algorithm: theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
