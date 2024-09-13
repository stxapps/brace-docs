import FlexSearch from 'flexsearch';

import { searchData } from '@/searchData';

const sectionIndex = new FlexSearch.Document({
  tokenize: 'full',
  document: {
    id: 'url',
    index: 'content',
    store: ['title', 'pageTitle'],
  },
  context: {
    resolution: 9,
    depth: 2,
    bidirectional: true,
  },
});

for (const { url, sections } of searchData) {
  for (const [title, hash, content] of sections) {
    sectionIndex.add({
      url: url + (hash ? '#' + hash : ''),
      title,
      content: [title, ...content].join('\\n'),
      pageTitle: hash ? sections[0][0] : undefined,
    });
  }
}

export function search(query, options = {}) {
  const result = sectionIndex.search(query, {
    ...options,
    enrich: true,
  });
  if (result.length === 0) {
    return [];
  }
  return result[0].result.map((item) => ({
    url: item.id,
    title: item.doc.title,
    pageTitle: item.doc.pageTitle,
  }));
}
