import createMDX from '@next/mdx';
import { mdxAnnotations } from 'mdx-annotations';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'export',
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [mdxAnnotations.remark],
    rehypePlugins: [mdxAnnotations.rehype],
    recmaPlugins: [mdxAnnotations.recma],
  },
});

export default withMDX(nextConfig);
