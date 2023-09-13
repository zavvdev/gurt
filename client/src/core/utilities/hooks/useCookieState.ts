import { useEffect, useState } from 'react';
import { cookieStorage } from '~/infrastructure/cookieStorage';

export function useCookieState(cookieName: string, fallbackValue?: string) {
  const [value, setValue] = useState<string | undefined>(
    cookieStorage.get(cookieName) || fallbackValue,
  );

  useEffect(() => {
    if (typeof value === 'string') {
      cookieStorage.put(cookieName, value);
    }
  }, [cookieName, value]);

  return [value, setValue] as const;
}
