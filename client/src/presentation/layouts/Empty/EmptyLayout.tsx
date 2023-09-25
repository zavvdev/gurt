import cx from 'clsx';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function EmptyLayout({ children, className }: Props) {
  return (
    <section className="flex justify-center">
      <div
        className={cx('w-[900px] max-md:w-11/12 px-10 max-md:px-0', className)}
      >
        {children}
      </div>
    </section>
  );
}
