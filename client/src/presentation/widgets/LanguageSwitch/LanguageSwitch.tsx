import { usePathname, useRouter } from 'next/navigation';
import { useCookieState } from '~/core/utilities/hooks/useCookieState';
import { I18N_COOKIE_NAME, LANGUAGES } from '~/presentation/i18n/config';
import { LangButton } from '~/presentation/widgets/LanguageSwitch/shared/LangButton/LangButton';

export function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const [_, setI18nCookie] = useCookieState(I18N_COOKIE_NAME);

  const onChange = (lang: string) => {
    setI18nCookie(lang);
    const langs = Object.values(LANGUAGES).join('/|/');
    router.push(`/${lang}/${pathname.replace(new RegExp(`/${langs}/`), '')}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 text-gray-400 text-sm max-md:text-xs">
      <LangButton lang={LANGUAGES.en} onClick={onChange} />|
      <LangButton lang={LANGUAGES.uk} onClick={onChange} />
    </div>
  );
}
