'use client';

import { animate } from 'animejs';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useRef } from 'react';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { Locale } from '@/i18n/config';
import Image from 'next/image';

const ProjectsSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLLIElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('projects');
  const locale = useLocale() as Locale;

  useEffect(() => {
    const elements: HTMLElement[] = [
      ...(titleRef.current ? [titleRef.current] : []),
      ...(buttonRef.current ? [buttonRef.current] : []),
      ...projectRefs.current.filter((element): element is HTMLLIElement => element !== null),
    ];

    elements.forEach((element) => {
      element.style.opacity = '0';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          animate(entry.target, {
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            ease: 'easeOut',
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="mt-24">
      {/* title */}
      <div ref={titleRef} className="container w-full h-full mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="flex-1 h-0.5 bg-accent " />
          <h2 className="text-3xl font-bold">{t('title')}</h2>
          <span className="flex-1 h-0.5 bg-accent " />
        </div>
      </div>
      <ul className="list-none space-y-20 p-0 md:space-y-32 container mx-auto mt-12">
        {projects.map((project, i) => {
          const isOdd = i % 2 === 0;

          return (
            <li
              key={project.title}
              ref={(el) => {
                projectRefs.current[i] = el;
              }}
              className="relative grid grid-cols-12 items-stretch gap-2 overflow-hidden rounded-xl opacity-0 md:overflow-visible"
            >
              {/* project content */}
              <div
                className={cn(
                  'relative z-10 col-span-full row-start-1 flex h-full flex-col justify-center p-6 sm:p-10 md:row-end-2 md:p-0',
                  isOdd
                    ? 'md:col-start-7 md:col-end-13 md:text-right'
                    : 'md:col-start-1 md:col-end-8 md:text-left'
                )}
              >
                <div>
                  <p className="mb-3 text-sm text-accent">Featured Project</p>
                  <h3 className="mb-5 text-2xl font-bold text-ink md:text-3xl">
                    <Link
                      href={`/projects/${project.title}`}
                      className="transition-colors hover:text-accent"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  {/* description */}
                  <div className="relative z-20 rounded-lg bg-accent-dark/95 p-6 text-slate-300 shadow-md hover:shadow-2xl backdrop-blur-sm md:bg-slate-800 md:p-7 transition-shadow duration-200">
                    <p className="leading-relaxed">{project[locale].description}</p>
                  </div>

                  {/* tags */}
                  {project.tags?.length && (
                    <ul
                      className={cn(
                        'relative z-20 mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400',
                        isOdd ? 'md:justify-end' : 'md:justify-start'
                      )}
                    >
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  )}

                  {/* links */}
                  <div
                    className={cn(
                      'relative z-20 mt-5 flex items-center gap-4',
                      isOdd ? 'md:justify-end' : 'md:justify-start'
                    )}
                  >
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} ${t('aria-github')}`}
                        className="text-slate-300 transition-colors hover:text-accent"
                      >
                        <IconBrandGithub className="size-6" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} ${t('aria-live')}`}
                        className="text-slate-300 transition-colors hover:text-accent"
                      >
                        <IconExternalLink className="size-6" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* project image */}
              <div
                className={cn(
                  'group relative z-0 col-span-full row-start-1 min-h-80 overflow-hidden rounded-xl md:row-end-2 md:min-h-[380px]',
                  isOdd ? 'md:col-start-1 md:col-end-8' : 'md:col-start-6 md:col-end-13'
                )}
              >
                <Link href={`/projects/${project.slug}`} className="absolute inset-0 block">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover rounded-xl grayscale brightness-90 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100"
                  />

                  {/* mix-blend-screen add later maybe */}
                  <span className="pointer-events-none rounded-xl absolute inset-0 bg-accent/20 mix-blend-screen transition-opacity duration-500 group-hover:opacity-0" />
                </Link>
                {/* overlay mobile */}
                <div className="pointer-events-none absolute inset-0 bg-bg/70 md:hidden" />
              </div>
            </li>
          );
        })}
      </ul>
      <div ref={buttonRef} className="flex items-center justify-center opacity-0 mt-12">
        <Link
          href="/projects"
          className="self-center px-4 py-2 font-semibold border border-line rounded-full text-ink bg-transparent hover:text-bg hover:bg-accent active:scale-[0.97] transition-all duration-150 active:bg-hover active:border-hover cursor-pointer"
        >
          {t('button')}
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
