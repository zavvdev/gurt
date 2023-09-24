'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { AntDesignProvider } from '~/presentation/providers/ThemeProvider/AntDesignProvider';
import { getAntDesignTheme, Theme } from '~/presentation/styles/theme';

type Props = PropsWithChildren<{
  locale: string;
}>;

function AntConfig({ children, locale }: Props) {
  const { resolvedTheme: currentTheme } = useTheme();

  return (
    <ConfigProvider
      locale={{ locale }}
      theme={{
        ...getAntDesignTheme(currentTheme as Theme),
        algorithm:
          currentTheme === Theme.Dark
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <AntDesignProvider>{children}</AntDesignProvider>
    </ConfigProvider>
  );
}

export function ThemeProvider(props: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="hidden">{props.children}</div>;
  }

  return (
    <NextThemeProvider
      enableSystem
      disableTransitionOnChange
      attribute="class"
      defaultTheme="system"
    >
      <AntConfig {...props} />
    </NextThemeProvider>
  );
}
