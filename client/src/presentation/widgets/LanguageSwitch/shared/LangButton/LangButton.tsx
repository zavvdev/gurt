import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';

interface Props {
  lang: string;
  onClick: (lang: string) => void;
}

export function LangButton({ lang, onClick }: Props) {
  const pathname = usePathname();

  const baseClasses = 'hover:text-gray-600 dark:hover:text-gray-100';
  const activeClasses = 'text-gray-600 hover:text-gray-600 dark:text-gray-100';

  return (
    <button
      onClick={() => onClick(lang)}
      className={twMerge(
        baseClasses,
        pathname.startsWith(`/${lang}`) && activeClasses,
      )}
    >
      {lang}
    </button>
  );
}
