'use client';
import { Suspense, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Dialog, DialogPanel } from '@headlessui/react';

import { Logomark } from '@/components/Logo';
import { Navigation } from '@/components/Navigation';

function MenuIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" {...props}>
      <path d="M5 5l14 14M19 5l-14 14" />
    </svg>
  );
}

function CloseOnNavigation({ close }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    close();
  }, [pathname, searchParams, close]);

  return null;
}

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  function onLinkClick(event) {
    const link = event.currentTarget;
    const cmpA = link.pathname + link.search + link.hash;
    const cmpB = window.location.pathname + window.location.search + window.location.hash;
    if (cmpA === cmpB) {
      close();
    }
  }

  return (
    <>
      <button type="button" onClick={open} className="relative" aria-label="Open navigation">
        <MenuIcon className="size-6 stroke-slate-500" />
      </button>
      <Suspense fallback={null}>
        <CloseOnNavigation close={close} />
      </Suspense>
      <Dialog open={isOpen} onClose={close} className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden" aria-label="Navigation">
        <DialogPanel className="min-h-full w-full max-w-xs bg-white px-4 pb-12 pt-5 sm:px-6 dark:bg-slate-900">
          <div className="flex items-center">
            <button type="button" onClick={close} aria-label="Close navigation">
              <CloseIcon className="size-6 stroke-slate-500" />
            </button>
            <Link href="/" className="ml-6" aria-label="Home page">
              <Logomark className="size-9" />
            </Link>
          </div>
          <Navigation className="mt-5 px-1" onLinkClick={onLinkClick} />
        </DialogPanel>
      </Dialog>
    </>
  );
}
