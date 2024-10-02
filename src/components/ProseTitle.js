'use client';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

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
    <header className={clsx('mb-9 space-y-1', grp && 'mt-2')}>
      {grp && <p className="text-sm text-gray-500 dark:text-gray-400">
        {grp}
      </p>}
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{title}</h1>
    </header>
  );
}
