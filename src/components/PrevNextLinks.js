'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { navIndexInfo, navMenuInfos } from '@/infos';
import { comparePaths } from '@/utils';

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z" />
    </svg>
  );
}

function PrevNextLink({ name, path, dir = 'next', ...props }) {
  return (
    <div {...props}>
      <dt className="text-sm font-medium text-gray-900 dark:text-white">
        {dir === 'next' ? 'Next' : 'Previous'}
      </dt>
      <dd className="mt-1">
        <Link href={path} className={clsx(
          'group flex items-center gap-x-1 focus:outline-none focus-visible:rounded focus-visible:ring',
          dir === 'previous' && 'flex-row-reverse',
        )}>
          <span className="text-base text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">{name}</span>
          <ArrowIcon className={clsx(
            'size-3.5 flex-none fill-current text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300',
            dir === 'previous' && '-scale-x-100',
          )} />
        </Link>
      </dd>
    </div>
  );
}

export function PrevNextLinks() {
  const pathname = usePathname();

  const infos = [navIndexInfo, ...navMenuInfos];
  const infoIndex = infos.findIndex((info) => comparePaths(info.path, pathname));
  const prevInfo = infoIndex > -1 ? infos[infoIndex - 1] : null;
  const nextInfo = infoIndex > -1 ? infos[infoIndex + 1] : null;

  if (!prevInfo && !nextInfo) return null;

  return (
    <dl className="mt-12 flex pt-6">
      {prevInfo && <PrevNextLink dir="previous" {...prevInfo} />}
      {nextInfo && <PrevNextLink className="ml-auto text-right" {...nextInfo} />}
    </dl>
  );
}
