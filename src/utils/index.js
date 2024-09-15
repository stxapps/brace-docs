export const isObject = val => {
  return typeof val === 'object' && val !== null;
};

export const isString = val => {
  return typeof val === 'string' || val instanceof String;
};

export const importMdxFile = async (slug) => {
  const impted = await import('@/mdx-files/' + slug + '.mdx');
  return impted;
};
