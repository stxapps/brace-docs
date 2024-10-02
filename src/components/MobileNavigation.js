'use client';
import { Suspense, useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Dialog, DialogPanel } from '@headlessui/react';

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
    const location = window.location;
    const cmpB = location.pathname + location.search + location.hash;
    if (cmpA === cmpB) {
      close();
    }
  }

  return (
    <>
      <button className="group flex size-14 items-center justify-center focus:outline-none sm:w-[4.5rem]" type="button" onClick={open} aria-label="Open navigation">
        <MenuIcon className="size-6 rounded stroke-gray-500 group-hover:stroke-gray-600 group-focus-visible:ring group-focus-visible:ring-offset-2 dark:group-hover:stroke-gray-400 dark:group-focus-visible:ring-offset-gray-900" />
      </button>
      <Suspense fallback={null}>
        <CloseOnNavigation close={close} />
      </Suspense>
      <Dialog open={isOpen} onClose={close} className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-gray-100 pr-10 lg:hidden dark:bg-gray-800" aria-label="Navigation">
        <DialogPanel className="min-h-full w-full max-w-xs bg-white px-4 pb-12 pt-[calc(3.5rem+theme(spacing.16))] sm:px-6 dark:bg-gray-900">
          <Navigation onLinkClick={onLinkClick} />
          <button className="group absolute left-0 top-0 flex size-14 items-center justify-center focus:outline-none sm:w-[4.5rem]" type="button" onClick={close} aria-label="Close navigation">
            <CloseIcon className="size-6 rounded stroke-gray-500 group-focus-visible:ring group-focus-visible:ring-offset-2 dark:group-focus-visible:ring-offset-gray-900" />
          </button>
        </DialogPanel>
      </Dialog>
    </>
  );
}
