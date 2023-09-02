import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isError?: boolean;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  variant?: 'large' | 'default' | 'small';
}

export function Input({
  isError,
  leftAdornment,
  rightAdornment,
  className,
  disabled,
  onFocus,
  onBlur,
  variant = 'default',
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocus?.(e);
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlur?.(e);
    setIsFocused(false);
  };

  const adornmentInnerSizes = [
    variant === 'large' && '[&_*]:max-h-6',
    variant === 'default' && '[&_*]:max-h-5',
    variant === 'small' && '[&_*]:max-h-[1.1rem]',
  ];

  return (
    <div
      className={twMerge(
        'group rounded bg-gray-100 flex justify-between items-center dark:bg-prmBright_DT ease-out duration-100',
        disabled &&
          'cursor-not-allowed bg-gray-300 opacity-60 dark:bg-gray-600 dark:opacity-40',
        variant === 'large' && 'h-14',
        variant === 'default' && 'h-11',
        variant === 'small' && 'h-9',
        isFocused && 'bg-prmBright dark:bg-gray-700',
        isError && 'bg-red-100 dark:bg-coffee text-red-500',
        className,
      )}
    >
      {leftAdornment && (
        <div
          className={twMerge(
            variant === 'default' && 'pl-3',
            variant === 'large' && 'pl-4',
            variant === 'small' && 'pl-2',
            adornmentInnerSizes,
          )}
        >
          {leftAdornment}
        </div>
      )}
      <input
        {...rest}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={twMerge(
          'h-full bg-transparent flex-1 focus:outline-none rounded peer/input',
          disabled && 'cursor-not-allowed',
          variant === 'large' && 'px-5',
          variant === 'default' && 'px-4 text-sm',
          variant === 'small' && 'px-3 text-xs',
          isError && 'placeholder:text-red-400 text-red-500',
          className,
        )}
      />
      {rightAdornment && (
        <div
          className={twMerge(
            variant === 'default' && 'pr-3',
            variant === 'large' && 'pr-4',
            variant === 'small' && 'pr-2',
            adornmentInnerSizes,
          )}
        >
          {rightAdornment}
        </div>
      )}
    </div>
  );
}
