import { persistedStorage } from '~/infrastructure/persistedStorage';

export function persistData(key: string, data: string) {
  return persistedStorage.put(key, data);
}

export function getPersistedData(key: string) {
  return persistedStorage.get(key);
}
