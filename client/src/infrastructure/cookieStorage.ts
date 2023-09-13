import Cookies from 'js-cookie';
import {
  CookieOptions,
  CookieStorage as CookieStorageEntity,
} from '~/entities/CookieStorage';

class CookieStorage implements CookieStorageEntity {
  private repo: typeof Cookies;

  constructor(repo: typeof Cookies) {
    this.repo = repo;
  }

  public put(
    name: string,
    value: string,
    options?: CookieOptions,
  ): string | undefined {
    return this.repo.set(name, value, options);
  }

  public get(name: string): string | undefined {
    return this.repo.get(name);
  }

  public remove(name: string, options?: CookieOptions): void {
    this.repo.remove(name, options);
  }
}

export const cookieStorage = new CookieStorage(Cookies);
