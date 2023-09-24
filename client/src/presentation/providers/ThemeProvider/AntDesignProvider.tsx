'use client';

import React, { useMemo } from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import type Entity from '@ant-design/cssinjs/es/Cache';

if (!process.browser) React.useLayoutEffect = React.useEffect;

export const AntDesignProvider = ({ children }: React.PropsWithChildren) => {
  const cache = useMemo<Entity>(() => createCache(), []);

  const render = <>{children}</>;

  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));

  if (typeof window !== 'undefined') {
    return render;
  }

  return (
    <StyleProvider hashPriority="high" cache={cache}>
      {render}
    </StyleProvider>
  );
};
