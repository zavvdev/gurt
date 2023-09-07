import { twMerge } from 'tailwind-merge';

interface Props {
  id: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
  isChecked: boolean;
  onChange: () => void;
  size?: 'default' | 'small';
}

export function Checkbox({
  id,
  children,
  className,
  labelClassName,
  isChecked,
  onChange,
  size,
}: Props) {
  return (
    <div className={twMerge('block min-h-[1.5rem] pl-[1.5rem]', className)}>
      <input
        className={twMerge(
          `relative float-left -ml-[1.5rem] mr-1 mt-[0.15rem]
          h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem]
          border-[0.125rem] border-solid border-neutral-300 outline-none
          before:absolute before:h-[0.875rem] before:w-[0.875rem]
          checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block 
          checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45
          checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0
          checked:after:border-solid checked:after:border-txt dark:checked:after:border-txt_DT
          checked:after:content-[''] hover:cursor-pointer dark:border-neutral-600
        `,
          size === 'small' &&
            `h-[1rem] w-[1rem] mt-[0.21rem] checked:after:h-[0.67rem] checked:after:ml-[0.18rem]
            checked:after:-mt-[0.02rem]`,
        )}
        type="checkbox"
        value=""
        id={id}
        checked={isChecked}
        onChange={onChange}
      />
      <label
        className={twMerge(
          'pl-0.5 hover:cursor-pointer select-none',
          size === 'small' && 'text-sm',
          labelClassName,
        )}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
}
