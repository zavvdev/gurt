import { useLanguageChange } from '~/core/utilities/hooks/useLanguageChange';
import { I18N_COOKIE_NAME, LANGUAGES } from '~/presentation/i18n/config';
import { LangButton } from '~/presentation/widgets/LanguageSwitch/shared/LangButton/LangButton';

export function LanguageSwitch() {
  const onChange = useLanguageChange({
    languages: Object.values(LANGUAGES),
    cookieName: I18N_COOKIE_NAME,
  });
  return (
    <div className="flex items-center justify-center gap-2 text-gray-400 text-sm max-md:text-xs">
      <LangButton lang={LANGUAGES.en} onClick={onChange} />|
      <LangButton lang={LANGUAGES.uk} onClick={onChange} />
    </div>
  );
}
