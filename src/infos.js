const GRP_FS = 'Features';
const GRP_CRS = 'Comparisons';
const GRP_101 = 'Brace.to 101';
const GRP_MISC = 'Misc.';

export const navGrpInfos = [
  { grp: GRP_FS }, { grp: GRP_CRS }, { grp: GRP_101 }, { grp: GRP_MISC },
];

export const navIndexInfo = { slug: 'index', name: 'Documentation', href: '/' };

const cnmi = (slug, name, grp, href = '') => {
  return { slug, name, grp, href };
};
const _navMenuInfos = [
  cnmi('account', 'Account', GRP_FS),
  cnmi('encryption', 'E2E Encryption', GRP_FS),
  cnmi('save-a-link', 'Save a link', GRP_FS),
  cnmi('organize-links', 'Organize links', GRP_FS),
  cnmi('vs-pocket', 'vs.Pocket', GRP_CRS),
  cnmi('vs-raindrop', 'vs.Raindrop', GRP_CRS),
  cnmi('bookmark-manager-101', 'Bookmark manager', GRP_101),
  cnmi('read-later-app-101', 'Read later app', GRP_101),
  cnmi('faqs', 'FAQs', GRP_MISC),
  cnmi('about', 'About', GRP_MISC),
];
for (const info of _navMenuInfos) {
  if (info.href.length === 0) info.href = '/' + info.slug;
}
export const navMenuInfos = _navMenuInfos;
