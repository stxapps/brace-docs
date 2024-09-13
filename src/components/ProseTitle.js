'use client';
import { usePathname } from 'next/navigation';

import { pageInfos } from '@/infos';

function getSection(pageInfos, pathname) {
  for (const pageInfo of pageInfos) {
    if (pageInfo.href === pathname) return pageInfo.section;
  }

  return null;
}

export function ProseTitle({ children: title }) {
  const pathname = usePathname();
  const section = getSection(pageInfos, pathname);

  if (!title) return null;

  return (
    <header className="mb-9 space-y-1">
      {section && <p className="font-display text-sm font-medium text-sky-500">
        {section.title}
      </p>}
      <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">{title}</h1>
    </header>
  );
}
