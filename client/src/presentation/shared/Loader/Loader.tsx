import { twMerge } from 'tailwind-merge';

interface Props {
  size?: 'default' | 'large' | 'small';
  className?: string;
  color?: 'primary' | 'white';
}

export function Loader({
  className,
  size = 'default',
  color = 'primary',
}: Props) {
  return (
    <div
      role="status"
      className={twMerge(
        color === 'primary' && 'border-prm',
        color === 'white' && 'border-white',
        'animate-spin rounded-full border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
        size === 'default' && 'h-5 w-5 border-2',
        size === 'large' && 'h-8 w-8 border-4',
        size === 'small' && 'h-3 w-3 border-2',
        className,
      )}
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
    </div>
  );
}
