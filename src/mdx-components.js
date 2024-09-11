import Link from 'next/link';

import { Heading } from '@/components/Heading';
import { Prose } from '@/components/Prose';

function H2(props) {
  return <Heading level={2} {...props} />;
}

function wrapper({ children }) {
  return (
    <article className="flex h-full flex-col pb-10 pt-16">
      <Prose className="flex-auto">{children}</Prose>
    </article>
  );
}

const moreComponents = {
  a: Link,
  h2: H2,
  wrapper: wrapper,
};

export function useMDXComponents(components) {
  return { ...components, ...moreComponents };
}
