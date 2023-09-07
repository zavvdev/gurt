import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'small';
}

export function InputError({ children, className, size }: Props) {
  return (
    <div
      className={twMerge(
        'mt-1 text-red-400',
        size === 'default' && 'text-sm',
        size === 'small' && 'text-xs',
        className,
      )}
    >
      {children}
    </div>
  );
}
