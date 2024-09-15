'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

function isEmpty(sections) {
  if (Array.isArray(sections) && sections.length > 0) return false;
  return true;
}

function getIds(sections) {
  const ids = [];
  if (Array.isArray(sections)) {
    for (const section of sections) {
      ids.push(section.id);
      ids.push(...getIds(section.children));
    }
  }
  return ids;
}

function isActive(currentSection, section) {
  if (section.id === currentSection) return true;
  if (!section.children) return false;
  return section.children.some(child => isActive(currentSection, child));
}

export function TableOfContents({ sections }) {

  const [currentSection, setCurrentSection] = useState(
    isEmpty(sections) ? null : sections[0].id
  );

  useEffect(() => {
    if (isEmpty(sections)) return;

    const headings = getIds(sections)
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;

        const style = window.getComputedStyle(el);
        const scrollMt = parseFloat(style.scrollMarginTop);
        const top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
        return { id, top };
      })
      .filter((x) => x !== null);

    function onScroll() {
      const top = window.scrollY;

      let current = headings[0].id;
      for (const heading of headings) {
        if (top >= heading.top - 10) {
          current = heading.id;
        } else {
          break;
        }
      }
      setCurrentSection(current);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [sections]);

  if (isEmpty(sections)) return null;

  return (
    <div className="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
      <nav aria-labelledby="on-this-page-title" className="w-56">
        <h2 id="on-this-page-title" className="font-display text-sm font-medium text-slate-900 dark:text-white">On this page</h2>
        <ol role="list" className="mt-4 space-y-3 text-sm">
          {sections.map((section) => {
            return (
              <li key={section.id}>
                <h3>
                  <Link
                    href={`#${section.id}`}
                    className={clsx(
                      isActive(currentSection, section)
                        ? 'text-sky-500'
                        : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300',
                    )}
                  >
                    {section.title}
                  </Link>
                </h3>
                {!isEmpty(section.children) && (
                  <ol role="list" className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">
                    {section.children.map((subSection) => (
                      <li key={subSection.id}>
                        <Link
                          href={`#${subSection.id}`}
                          className={
                            isActive(currentSection, subSection)
                              ? 'text-sky-500'
                              : 'hover:text-slate-600 dark:hover:text-slate-300'
                          }
                        >
                          {subSection.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
