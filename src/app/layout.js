import { Inter } from 'next/font/google';
import clsx from 'clsx';

import './globals.css';
import { Providers } from './providers';

import { TopBar } from '@/components/TopBar';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: 'rgb(17, 24, 39)' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={clsx('h-full antialiased', inter.variable)} suppressHydrationWarning>
      <body className="flex min-h-full bg-white dark:bg-slate-900">
        <Providers>
          <div className="flex w-full flex-col">
            <TopBar />
            <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
              <div className="hidden lg:relative lg:block lg:flex-none">
                <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
                <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
                <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
                <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
                  <Navigation />
                </div>
              </div>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
