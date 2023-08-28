import React from 'react';
import cx from 'clsx';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: 'primary';
  size?: 'large' | 'default' | 'small';
  fullWidth?: boolean;
  isDisabled?: boolean;
}

export function Button({
  children,
  className,
  onClick,
  color = 'primary',
  size = 'default',
  fullWidth = false,
  isDisabled = false,
}: Props) {
  const baseClasses = 'rounded font-medium ease-in-out duration-100';

  const sSmallClasses = 'px-4 py-1 text-sm';
  const sDefaultClasses = 'px-8 py-2';
  const sLargeClasses = 'px-12 py-2 text-lg';

  const cPrimaryClasses = 'bg-primary text-white hover:bg-primaryDark';

  const disabledClasses = `
    bg-gray-300 hover:bg-gray-300 pointer-events-none
    dark:bg-primaryLight_Dark dark:text-gray-500
  `;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cx(
        baseClasses,
        {
          [sSmallClasses]: size === 'small',
          [sDefaultClasses]: size === 'default',
          [sLargeClasses]: size === 'large',
          [cPrimaryClasses]: color === 'primary',
          [disabledClasses]: isDisabled,
          'w-full': fullWidth,
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
