const GRP_FS = 'Features';
const GRP_CRS = 'Compare';
const GRP_101 = 'Brace.to 101';
const GRP_MISC = 'Misc.';

export const navGrpInfos = [
  { grp: GRP_FS }, /*{ grp: GRP_CRS },*/ { grp: GRP_101 }, { grp: GRP_MISC },
];

export const navIndexInfo = { slug: 'index', name: 'Documentation', path: '/' };

const cnmi = (slug, name, grp, path = '') => {
  return { slug, name, grp, path };
};
const _navMenuInfos = [
  cnmi('account', 'Account', GRP_FS),
  cnmi('encryption', 'Encryption', GRP_FS),
  cnmi('data-server', 'Data Server', GRP_FS),
  //sign up/in/out
  cnmi('save-a-link', 'Save a Link', GRP_FS),
  cnmi('organize-links', 'Organize Links', GRP_FS),
  //link preview
  //cnmi('custom-a-link', 'Custom a Link', GRP_FS),
  //cnmi('pin-links', 'Pin Links', GRP_FS),
  //cnmi('tag-links', 'Tag Links', GRP_FS),
  //cnmi('import-data', 'Import Data', GRP_FS),
  //cnmi('export-data', 'Export Data', GRP_FS),
  //delete all data
  //cnmi('vs-pocket', 'vs.Pocket', GRP_CRS),
  //cnmi('vs-raindrop', 'vs.Raindrop', GRP_CRS),
  cnmi('bookmark-manager-101', 'Bookmark Manager', GRP_101),
  cnmi('read-later-app-101', 'Read-later app', GRP_101),
  cnmi('faqs', 'FAQs', GRP_MISC),
  //cnmi('about', 'About', GRP_MISC),
];
for (const info of _navMenuInfos) {
  if (info.path.length === 0) info.path = '/' + info.slug;
}
export const navMenuInfos = _navMenuInfos;

export const DOMAIN_NAME = 'https://docs.brace.to';

export const twInfo = {
  site: '@bracedotto',
  images: [DOMAIN_NAME + '/twitter-card-image-pattern5.png'],
  card: 'summary_large_image',
};

export const ogInfo = {
  siteName: 'Docs - Brace.to',
  url: DOMAIN_NAME,
  type: 'article',
  images: [DOMAIN_NAME + '/twitter-card-image-pattern5.png'],
};
