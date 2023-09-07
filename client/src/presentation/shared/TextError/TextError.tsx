import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'small';
  center?: boolean;
}

export function TextError({ children, className, size, center }: Props) {
  return (
    <div
      className={twMerge(
        'text-red-400',
        size === 'default' && 'text-sm',
        size === 'small' && 'text-xs',
        center && 'text-center',
        className,
      )}
    >
      {children}
    </div>
  );
}
