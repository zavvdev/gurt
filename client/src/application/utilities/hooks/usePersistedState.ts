import { useEffect, useState } from 'react';
import { persistedStorage } from '~/infrastructure/persistedStorage';

export function usePersistedState<T>(
  key: string,
  fallbackValue: T | null = null,
) {
  const [value, setValue] = useState<unknown>(
    persistedStorage.get(key) || fallbackValue,
  );

  useEffect(() => {
    persistedStorage.put(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
