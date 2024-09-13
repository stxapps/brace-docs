import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { SKIP, visit } from 'unist-util-visit';
import { filter } from 'unist-util-filter';
import glob from 'fast-glob';
import { slugifyWithCounter } from '@sindresorhus/slugify';
import { toString } from 'mdast-util-to-string';

const slugify = slugifyWithCounter();

function isObjectExpression(node) {
  return (
    node.type === 'mdxTextExpression' &&
    node.data?.estree?.body?.[0]?.expression?.type === 'ObjectExpression'
  )
}

function excludeObjectExpressions(tree) {
  return filter(tree, (node) => !isObjectExpression(node));
}

function extractSections() {
  return (tree, { sections }) => {
    slugify.reset();

    visit(tree, (node) => {
      if (node.type === 'heading' || node.type === 'paragraph') {
        let content = toString(excludeObjectExpressions(node));
        if (node.type === 'heading' && node.depth <= 2) {
          let hash = node.depth === 1 ? null : slugify(content)
          sections.push([content, hash, []])
        } else {
          sections.at(-1)?.[2].push(content)
        }
        return SKIP;
      }
    });
  };
}

const processor = remark().use(remarkMdx).use(extractSections);

function buildSearchData() {
  const cache = new Map();

  const dpath = path.resolve('./src/app');
  const fpaths = glob.sync('**/*.mdx', { cwd: dpath });
  const data = fpaths.map((fpath) => {
    const url = '/' + fpath.replace(/(^|\/)page\.mdx$/, '');
    let sections = [];

    const content = fs.readFileSync(path.join(dpath, fpath), 'utf8');
    if (cache.get(fpath)?.[0] === content) {
      sections = cache.get(fpath)[1];
    } else {
      const vfile = { value: content, sections };
      processor.runSync(processor.parse(vfile), vfile)
      cache.set(fpath, [content, sections])
    }

    return { url, sections };
  });

  const wFPath = path.resolve('./src');
  const wContent = `export const searchData = ${JSON.stringify(data)};`;
  fs.writeFileSync(wFPath, wContent, 'utf8');
}
buildSearchData();
