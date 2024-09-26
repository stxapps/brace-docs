'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next-image-export-optimizer';
import clsx from 'clsx';

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
    <header className={clsx('sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8 dark:shadow-none', isScrolled ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75' : 'dark:bg-transparent')}>
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation />
      </div>
      <div className="relative flex grow basis-0 items-center">
        <Link href="https://brace.to" aria-label="Brace.to" target="_blank" rel="noreferrer">
          <Image className="h-6 w-auto dark:hidden" src={Logo} alt="Brace.to logo" />
          <Image className="hidden h-6 w-auto dark:block" src={LogoDark} alt="Brace.to logo" />
        </Link>
      </div>
      <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
        <Search />
      </div>
      <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:grow">
        <ThemeSelector className="relative z-10" />
        <Link href="https://brace.to" className="group rounded-full bg-gray-900" aria-label="Brace.to" target="_blank" rel="noreferrer">
          <span className="text-lg font-medium text-gray-50">App</span>
          <svg className="ml-2 w-2 text-gray-50" viewBox="0 0 6 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.29289 9.7071C-0.09763 9.3166 -0.09763 8.6834 0.29289 8.2929L3.5858 5L0.29289 1.70711C-0.09763 1.31658 -0.09763 0.68342 0.29289 0.29289C0.68342 -0.09763 1.31658 -0.09763 1.70711 0.29289L5.7071 4.29289C6.0976 4.68342 6.0976 5.3166 5.7071 5.7071L1.70711 9.7071C1.31658 10.0976 0.68342 10.0976 0.29289 9.7071Z" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
