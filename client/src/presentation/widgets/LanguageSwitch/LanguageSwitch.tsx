import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { I18N_COOKIE_NAME, LANGUAGES } from '~/presentation/i18n/config';
import { LangButton } from '~/presentation/widgets/LanguageSwitch/shared/LangButton/LangButton';

export function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();

  const onChange = (lang: string) => {
    Cookies.set(I18N_COOKIE_NAME, lang);
    router.push(
      `/${lang}/${pathname.replace(
        new RegExp(`/${LANGUAGES.en}/|/${LANGUAGES.uk}/`),
        '',
      )}`,
    );
  };

  return (
    <div className="flex items-center justify-center gap-2 text-gray-400 text-sm max-md:text-xs">
      <LangButton lang={LANGUAGES.en} onClick={onChange} />|
      <LangButton lang={LANGUAGES.uk} onClick={onChange} />
    </div>
  );
}
