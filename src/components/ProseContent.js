import clsx from 'clsx';

export function ProseContent(props) {
  const { as, className, ...restProps } = props;
  const Component = as ?? 'div';

  return (
    <Component
      className={clsx(
        className,
        'prose max-w-none text-gray-500 dark:prose-invert dark:text-gray-400',
        'prose-headings:scroll-mt-28',
        'focus:prose-a:outline-none focus-visible:prose-a:rounded focus-visible:prose-a:ring',
      )}
      {...restProps} />
  );
}
