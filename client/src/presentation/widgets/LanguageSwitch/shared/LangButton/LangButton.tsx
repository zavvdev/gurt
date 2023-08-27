import cx from 'clsx';
import { usePathname } from 'next/navigation';

interface Props {
  lang: string;
  onClick: (lang: string) => void;
}

export function LangButton({ lang, onClick }: Props) {
  const pathname = usePathname();

  return (
    <button
      onClick={() => onClick(lang)}
      className={cx('hover:text-gray-600 dark:hover:text-gray-100', {
        'text-gray-600 hover:text-gray-600 dark:text-gray-100':
          pathname.startsWith(`/${lang}`),
      })}
    >
      {lang}
    </button>
  );
}
