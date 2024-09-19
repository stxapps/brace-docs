'use client';
import { usePathname } from 'next/navigation';

import { navMenuInfos } from '@/infos';
import { comparePaths } from '@/utils';

function getMenuGrp(navMenuInfos, pathname) {
  for (const info of navMenuInfos) {
    if (comparePaths(info.path, pathname)) return info.grp;
  }

  return null;
}

export function ProseTitle({ children: title }) {
  const pathname = usePathname();
  const grp = getMenuGrp(navMenuInfos, pathname);

  if (!title) return null;

  return (
    <header className="mb-9 space-y-1">
      {grp && <p className="font-display text-sm font-medium text-sky-500">
        {grp}
      </p>}
      <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">{title}</h1>
    </header>
  );
}
