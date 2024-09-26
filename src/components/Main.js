import { ProseTitle } from '@/components/ProseTitle';
import { ProseContent } from '@/components/ProseContent';
import { TableOfContents } from '@/components/TableOfContents';
import { PrevNextLinks } from '@/components/PrevNextLinks';
import { Footer } from '@/components/Footer';

export function Main({ children, ...props }) {
  const { title, sections } = props;

  return (
    <>
      <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
        <article>
          <ProseTitle>{title}</ProseTitle>
          <ProseContent>{children}</ProseContent>
        </article>
        <PrevNextLinks />
        <Footer />
      </div>
      <TableOfContents sections={sections} />
    </>
  );
}
