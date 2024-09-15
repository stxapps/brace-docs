import { navMenuInfos } from '@/infos';
import { importMdxFile } from '@/utils';
import { Main } from '@/components/Main';

export async function generateMetadata({ params }) {
  const { slug } = params;

  const { metadata } = await importMdxFile(slug);
  return metadata;
}

export default async function Page({ params }) {
  const { slug } = params;

  const { default: Mdx, title, sections } = await importMdxFile(slug);
  return (
    <Main title={title} sections={sections}>
      <Mdx />
    </Main>
  );
}

export function generateStaticParams() {
  return navMenuInfos.map(info => ({
    slug: info.slug,
  }));
}
