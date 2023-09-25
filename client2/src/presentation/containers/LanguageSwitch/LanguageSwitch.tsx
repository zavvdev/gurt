import { usePathname, useRouter } from 'next/navigation';
import { Button, Dropdown, MenuProps } from 'antd';
import { useCookieState } from '~/core/utilities/hooks/useCookieState';
import { I18N_COOKIE_NAME, LANGUAGES } from '~/presentation/i18n/config';
import { Icons } from '~/presentation/shared/Icons';

export function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentLang, setI18nCookie] = useCookieState(I18N_COOKIE_NAME);

  const onClick: MenuProps['onClick'] = ({ key: lang }) => {
    setI18nCookie(lang);
    const langs = Object.values(LANGUAGES).join('/|/');
    router.push(`/${lang}/${pathname.replace(new RegExp(`/${langs}/`), '')}`);
  };

  const items: MenuProps['items'] = [
    {
      key: LANGUAGES.en,
      label: LANGUAGES.en,
    },
    {
      key: LANGUAGES.uk,
      label: LANGUAGES.uk,
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [currentLang ?? LANGUAGES.en],
        onClick,
      }}
    >
      <Button type="text" className="p-2 flex items-center justify-center">
        <Icons.Languages />
      </Button>
    </Dropdown>
  );
}
