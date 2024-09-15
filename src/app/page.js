import { importMdxFile } from '@/utils';
import { Main } from '@/components/Main';

export async function generateMetadata() {
  const { metadata } = await importMdxFile('index');
  return metadata;
}

export default async function Page() {
  const { default: Mdx, title, sections } = await importMdxFile('index');

  return (
    <Main title={title} sections={sections}>
      <Mdx />
    </Main>
  );
}
