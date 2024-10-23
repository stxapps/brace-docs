'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { navGrpInfos, navMenuInfos } from '@/infos';
import { comparePaths } from '@/utils';

function DocumentationIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9 4.80401C7.90971 4.27317 6.71265 3.99819 5.5 4.00001C4.245 4.00001 3.057 4.29001 2 4.80401V14.804C3.0903 14.2732 4.28736 13.9982 5.5 14C7.169 14 8.718 14.51 10 15.385C11.3261 14.4802 12.8947 13.9975 14.5 14C15.755 14 16.943 14.29 18 14.804V4.80401C16.9097 4.27317 15.7126 3.99819 14.5 4.00001C13.245 4.00001 12.057 4.29001 11 4.80401V12C11 12.2652 10.8946 12.5196 10.7071 12.7071C10.5196 12.8947 10.2652 13 10 13C9.73478 13 9.48043 12.8947 9.29289 12.7071C9.10536 12.5196 9 12.2652 9 12V4.80401Z" />
    </svg>
  );
}

function BlogIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H12C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5V15C14 15.5304 14.2107 16.0391 14.5858 16.4142C14.9609 16.7893 15.4696 17 16 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V5ZM5 6H11V10H5V6ZM11 12H5V14H11V12Z" />
      <path d="M15 7H16C16.5304 7 17.0391 7.21071 17.4142 7.58579C17.7893 7.96086 18 8.46957 18 9V14.5C18 14.8978 17.842 15.2794 17.5607 15.5607C17.2794 15.842 16.8978 16 16.5 16C16.1022 16 15.7206 15.842 15.4393 15.5607C15.158 15.2794 15 14.8978 15 14.5V7Z" />
    </svg>
  );
}

function SupportIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10ZM16 10C16 10.993 15.759 11.929 15.332 12.754L13.808 11.229C14.0362 10.5227 14.0632 9.76679 13.886 9.046L15.448 7.484C15.802 8.249 16 9.1 16 10ZM10.835 13.913L12.415 15.493C11.654 15.8281 10.8315 16.0007 10 16C9.13118 16.0011 8.27257 15.8127 7.484 15.448L9.046 13.886C9.63267 14.0298 10.2443 14.039 10.835 13.913ZM6.158 11.117C5.96121 10.4394 5.94707 9.72182 6.117 9.037L6.037 9.117L4.507 7.584C4.1718 8.34531 3.99913 9.16817 4 10C4 10.954 4.223 11.856 4.619 12.657L6.159 11.117H6.158ZM7.246 4.667C8.09722 4.22702 9.04179 3.99825 10 4C10.954 4 11.856 4.223 12.657 4.619L11.117 6.159C10.3493 5.93538 9.53214 5.94687 8.771 6.192L7.246 4.668V4.667ZM12 10C12 10.5304 11.7893 11.0391 11.4142 11.4142C11.0391 11.7893 10.5304 12 10 12C9.46957 12 8.96086 11.7893 8.58579 11.4142C8.21071 11.0391 8 10.5304 8 10C8 9.46957 8.21071 8.96086 8.58579 8.58579C8.96086 8.21071 9.46957 8 10 8C10.5304 8 11.0391 8.21071 11.4142 8.58579C11.7893 8.96086 12 9.46957 12 10Z" />
    </svg>
  );
}

export function Navigation(props) {
  const { className, onLinkClick } = props;
  const pathname = usePathname();

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        <li>
          <Link
            href="/"
            onClick={onLinkClick}
            className={clsx('group flex w-full items-center rounded focus:outline-none focus-visible:ring')}
          >
            <DocumentationIcon className={clsx(
              'size-[1.1875rem]',
              comparePaths('/', pathname)
                ? 'text-gray-800 dark:text-gray-100'
                : 'text-gray-600 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-100'
            )} />
            <span className={clsx(
              'ml-1.5 font-medium',
              comparePaths('/', pathname)
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-700 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-white'
            )}>Documentation</span>
          </Link>
        </li>
        <li>
          <Link className="group flex w-full items-center rounded focus:outline-none focus-visible:ring" href="https://medium.com/@stxapps" target="_blank" rel="noreferrer">
            <BlogIcon className="size-[1.125rem] text-gray-600 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100" />
            <span className="ml-1.5 font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-white">Blog</span>
          </Link>
        </li>
        <li>
          <Link className="group -ml-px flex w-full items-center rounded focus:outline-none focus-visible:ring" href="https://brace.to/#support" target="_blank" rel="noreferrer">
            <SupportIcon className="size-[1.125rem] text-gray-600 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-100" />
            <span className="ml-1.5 font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-white">Support</span>
          </Link>
        </li>
        {navGrpInfos.map(({ grp }) => (
          <li key={grp}>
            <h2 className="text-sm font-medium text-gray-900 dark:text-white">
              {grp}
            </h2>
            <ul role="list" className="mt-2 space-y-2 border-l-2 border-gray-200 lg:mt-4 lg:space-y-4 dark:border-gray-700" >
              {navMenuInfos.filter(el => el.grp === grp).map((info) => (
                <li key={info.slug} className="relative">
                  <Link
                    href={info.path}
                    onClick={onLinkClick}
                    className={clsx(
                      'block w-full rounded pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:size-1.5 before:-translate-y-1/2 before:rounded-full focus:outline-none focus-visible:ring',
                      comparePaths(info.path, pathname)
                        ? 'font-semibold text-gray-600 before:bg-gray-400 dark:text-gray-300 dark:before:bg-gray-500'
                        : 'text-gray-500 before:hidden before:bg-gray-300 hover:text-gray-600 hover:before:block dark:text-gray-400 dark:before:bg-gray-600 dark:hover:text-gray-300',
                    )}
                    prefetch={false}
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
