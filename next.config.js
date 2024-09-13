import { withMDX } from './src/mdx.config.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'export',
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
};

export default withMDX(nextConfig);
