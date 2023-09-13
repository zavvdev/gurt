import { usePathname, useRouter } from 'next/navigation';
import { cookieStorage } from '~/infrastructure/cookieStorage';

interface Args {
  languages: string[];
  cookieName: string;
}

export function useLanguageChange({ languages, cookieName }: Args) {
  const pathname = usePathname();
  const router = useRouter();

  const onChange = (lang: string) => {
    cookieStorage.put(cookieName, lang);
    const langs = languages.join('/|/');
    router.push(`/${lang}/${pathname.replace(new RegExp(`/${langs}/`), '')}`);
  };

  return onChange;
}
