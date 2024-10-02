'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next-image-export-optimizer';

import { MobileNavigation } from '@/components/MobileNavigation';
import { Search } from '@/components/Search';
import { ThemeSelector } from '@/components/ThemeSelector';
import Logo from '@/images/logo.svg';
import LogoDark from '@/images/logo-dark.svg';

export function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-14 flex-none flex-wrap items-center justify-between bg-white dark:bg-gray-900">
      <div className="flex lg:hidden">
        <MobileNavigation />
      </div>
      <div className="relative flex grow basis-0 items-center lg:pl-8 xl:pl-12">
        <Link className="rounded focus:outline-none focus-visible:ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900" href="https://brace.to" aria-label="Brace.to" target="_blank" rel="noreferrer">
          <Image className="h-8 w-auto dark:hidden" src={Logo} alt="Brace.to logo" />
          <Image className="hidden h-8 w-auto dark:block" src={LogoDark} alt="Brace.to logo" />
        </Link>
      </div>
      <div className="">
        <Search />
      </div>
      <div className="relative mr-4 flex basis-0 justify-end sm:mr-6 md:grow lg:mr-8 xl:mr-12">
        <ThemeSelector className="relative z-10" />
        <Link className="group ml-2.5 flex h-14 items-center justify-center focus:outline-none md:ml-0" href="https://brace.to" aria-label="Brace.to" target="_blank" rel="noreferrer">
          <div className="flex items-center rounded-full border border-gray-400 bg-white px-2.5 py-1.5 text-sm text-gray-500 group-hover:border-gray-500 group-hover:text-gray-600 group-focus-visible:ring dark:border-gray-500 dark:bg-gray-900 dark:text-gray-400 dark:group-hover:border-gray-400 dark:group-hover:text-gray-300">
            <span className="">App</span>
            <svg className="ml-1 w-1.5" viewBox="0 0 6 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.29289 9.7071C-0.09763 9.3166 -0.09763 8.6834 0.29289 8.2929L3.5858 5L0.29289 1.70711C-0.09763 1.31658 -0.09763 0.68342 0.29289 0.29289C0.68342 -0.09763 1.31658 -0.09763 1.70711 0.29289L5.7071 4.29289C6.0976 4.68342 6.0976 5.3166 5.7071 5.7071L1.70711 9.7071C1.31658 10.0976 0.68342 10.0976 0.29289 9.7071Z" />
            </svg>
          </div>
        </Link>
      </div>
      {isScrolled && (
        <>
          <div className="absolute bottom-0 left-0 h-px w-16 bg-gradient-to-l from-gray-200 dark:from-gray-700" />
          <div className="absolute inset-x-16 bottom-0 h-px bg-gray-200 dark:bg-gray-700" />
          <div className="absolute bottom-0 right-0 h-px w-16 bg-gradient-to-r from-gray-200 dark:from-gray-700" />
        </>
      )}
    </header>
  );
}
