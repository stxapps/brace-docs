'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { navIndexInfo, navMenuInfos } from '@/infos';

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z" />
    </svg>
  );
}

function PrevNextLink({ name, href, dir = 'next', ...props }) {
  return (
    <div {...props}>
      <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
        {dir === 'next' ? 'Next' : 'Previous'}
      </dt>
      <dd className="mt-1">
        <Link href={href} className={clsx(
          'flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300',
          dir === 'previous' && 'flex-row-reverse',
        )}>
          {name}
          <ArrowIcon className={clsx(
            'size-4 flex-none fill-current',
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
  const infoIndex = infos.findIndex((info) => info.href === pathname);
  const prevInfo = infoIndex > -1 ? infos[infoIndex - 1] : null;
  const nextInfo = infoIndex > -1 ? infos[infoIndex + 1] : null;

  if (!prevInfo && !nextInfo) return null;

  return (
    <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
      {prevInfo && <PrevNextLink dir="previous" {...prevInfo} />}
      {nextInfo && <PrevNextLink className="ml-auto text-right" {...nextInfo} />}
    </dl>
  );
}
