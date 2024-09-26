import { navMenuInfos } from '@/infos';
import { importMdxFile } from '@/utils';
import { Main } from '@/components/Main';

import { DOMAIN_NAME, twInfo, ogInfo } from '@/infos';
import { isObject, isString, deriveMetaTitle } from '@/utils';

export async function generateMetadata({ params }) {
  const { slug } = params;

  const { metadata } = await importMdxFile(slug);

  const url = DOMAIN_NAME + '/' + slug;
  const res = /** @type any */({ twitter: { ...twInfo }, openGraph: { ...ogInfo, url } });
  if (isObject(metadata)) {
    if (isString(metadata.title)) {
      const title = deriveMetaTitle(metadata.title);
      res.title = title;
      res.twitter.title = title;
      res.openGraph.title = title;
    }
    if (isString(metadata.description)) {
      res.description = metadata.description;
      res.twitter.description = metadata.description;
      res.openGraph.description = metadata.description;
    }
  }
  return res;
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
