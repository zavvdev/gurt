import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  color?: 'primary';
  size?: 'large' | 'default' | 'small';
  fullWidth?: boolean;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  centerWithAdornments?: boolean;
}

export function Button({
  children,
  disabled,
  className,
  onClick,
  leftAdornment,
  rightAdornment,
  color = 'primary',
  size = 'default',
  fullWidth = false,
  centerWithAdornments = false,
  ...rest
}: Props) {
  const baseClasses = `rounded font-medium ease-in-out 
    duration-100 flex items-center justify-center
  `;

  const sSmallClasses = 'px-4 py-1 text-sm gap-1';
  const sDefaultClasses = 'px-8 py-2 gap-1.5';
  const sLargeClasses = 'px-12 py-2 text-lg gap-2';

  const cPrimaryClasses = 'bg-prm text-white hover:bg-prmLight';

  const disabledClasses = `
    bg-gray-300 hover:bg-gray-300 cursor-not-allowed
    dark:bg-prmFade_DT dark:text-gray-500
  `;

  const adornmentInnerSizes = [
    size === 'large' && '[&_svg]:max-h-6',
    size === 'default' && '[&_svg]:max-h-5',
    size === 'small' && '[&_svg]:max-h-[1.1rem]',
  ];

  const leftAdornmentClasses = twMerge(
    'flex justify-end',
    !centerWithAdornments && 'flex-1',
    adornmentInnerSizes,
  );

  const rightAdornmentClasses = twMerge(
    'flex justify-start',
    !centerWithAdornments && 'flex-1',
    adornmentInnerSizes,
  );

  return (
    <button
      {...rest}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        baseClasses,
        size === 'small' && sSmallClasses,
        size === 'default' && sDefaultClasses,
        size === 'large' && sLargeClasses,
        color === 'primary' && cPrimaryClasses,
        disabled && disabledClasses,
        fullWidth && 'w-full',
        className,
      )}
    >
      {centerWithAdornments ? (
        <>
          {leftAdornment && (
            <div className={leftAdornmentClasses}>{leftAdornment}</div>
          )}
        </>
      ) : (
        <div className={leftAdornmentClasses}>{leftAdornment}</div>
      )}

      {children}

      {centerWithAdornments ? (
        <>
          {rightAdornment && (
            <div className={rightAdornmentClasses}>{rightAdornment}</div>
          )}
        </>
      ) : (
        <div className={rightAdornmentClasses}>{rightAdornment}</div>
      )}
    </button>
  );
}
