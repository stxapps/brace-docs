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
  if (!Array.isArray(section.children)) return false;
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

        const top = window.scrollY + el.getBoundingClientRect().top;
        return { id, top };
      })
      .filter((x) => x !== null)
      .sort((a, b) => a.top - b.top);

    function onScroll() {
      const [top, height] = [window.scrollY, window.innerHeight];

      let current = headings[0].id;
      for (const heading of headings) {
        if (heading.top < top + (height * 0.5)) {
          current = heading.id;
          continue;
        }
        break;
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
    <div className="hidden xl:sticky xl:top-14 xl:-mr-6 xl:block xl:h-[calc(100vh-3.5rem)] xl:flex-none xl:overflow-y-auto xl:py-[4.25rem] xl:pl-2 xl:pr-6">
      <nav aria-labelledby="on-this-page-title" className="w-56">
        <h2 id="on-this-page-title" className="text-sm font-medium text-gray-900 dark:text-white">On this page</h2>
        <ol role="list" className="mt-4 space-y-3 text-sm">
          {sections.map((section) => {
            return (
              <li key={section.id}>
                <h3>
                  <Link
                    href={`#${section.id}`}
                    className={clsx(
                      'block focus:outline-none focus-visible:rounded focus-visible:ring',
                      isActive(currentSection, section)
                        ? 'text-gray-700 dark:text-gray-200'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                    )}
                  >
                    {section.title}
                  </Link>
                </h3>
                {!isEmpty(section.children) && (
                  <ol role="list" className="mt-2 space-y-3 pl-5">
                    {section.children.map((subSection) => (
                      <li key={subSection.id}>
                        <Link
                          href={`#${subSection.id}`}
                          className={clsx(
                            'block focus:outline-none focus-visible:rounded focus-visible:ring',
                            isActive(currentSection, subSection)
                              ? 'text-gray-700 dark:text-gray-200'
                              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                          )}
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
