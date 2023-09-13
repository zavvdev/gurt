export interface CookieOptions {
  expires?: number | undefined;
  path?: string | undefined;
  domain?: string | undefined;
  secure?: boolean | undefined;
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined;
}

export interface CookieStorage {
  put(name: string, value: string, options?: CookieOptions): string | undefined;
  get(name: string): string | undefined;
  remove(name: string, options?: CookieOptions): void;
}
