'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { navGrpInfos, navMenuInfos } from '@/infos';

export function Navigation(props) {
  const { className, onLinkClick } = props;
  const pathname = usePathname();

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        <li>
          <Link href="/">Documentation</Link>
        </li>
        <li>
          <Link href="/">Blog</Link>
        </li>
        <li>
          <Link href="/">Support</Link>
        </li>
        {navGrpInfos.map(({ grp }) => (
          <li key={grp}>
            <h2 className="font-display font-medium text-slate-900 dark:text-white">
              {grp}
            </h2>
            <ul role="list" className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800" >
              {navMenuInfos.filter(el => el.grp === grp).map((info) => (
                <li key={info.slug} className="relative">
                  <Link
                    href={info.href}
                    onClick={onLinkClick}
                    className={clsx(
                      'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:size-1.5 before:-translate-y-1/2 before:rounded-full',
                      info.href === pathname
                        ? 'font-semibold text-sky-500 before:bg-sky-500'
                        : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300',
                    )}
                  >{info.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
