import { importMdxFile } from '@/utils';
import { Main } from '@/components/Main';

import { twInfo, ogInfo } from '@/infos';
import { isObject, isString, deriveMetaTitle } from '@/utils';

export async function generateMetadata() {
  const { metadata } = await importMdxFile('index');

  const res = /** @type any */({ twitter: { ...twInfo }, openGraph: { ...ogInfo } });
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

export default async function Page() {
  const { default: Mdx, title, sections } = await importMdxFile('index');

  return (
    <Main title={title} sections={sections}>
      <Mdx />
    </Main>
  );
}
