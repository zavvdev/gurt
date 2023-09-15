import { twMerge } from 'tailwind-merge';
import { useThemeSwitch } from '~/presentation/helpers/hooks/useThemeSwitch';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function EmptyLayout({ children, className }: Props) {
  useThemeSwitch();

  return (
    <section className="flex justify-center">
      <div
        className={twMerge(
          'w-[900px] max-md:w-11/12 px-10 max-md:px-0',
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
}
