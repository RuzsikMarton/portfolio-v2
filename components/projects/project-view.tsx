'use client';

import { useRef, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { Project, ProjectTranslation } from '@/prisma/generated/prisma/client';
import { IconArrowLeft, IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { animate } from 'animejs';

type Props = {
  project: Project;
  translation: ProjectTranslation;
};

const ProjectView = ({ project, translation }: Props) => {
  const t = useTranslations('projectpage');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      section.style.opacity = '1';
      return;
    }

    animate(section, {
      opacity: [0, 1],
      duration: 1500,
      ease: 'in(4)',
    });
  }, []);

  const details = [
    {
      label: t('role'),
      value: project.role ? t(`role-value.${project.role}`) : null,
    },
    {
      label: t('period'),
      value: project.period,
    },
    {
      label: t('launched'),
      value: project.launchedAt ? project.launchedAt : null,
    },
    {
      label: t('status'),
      value: project.status ? t(`status-value.${project.status}`) : null,
      icon: <span className="bg-accent size-1.5 rounded-full" />,
    },
  ].filter((item) => item.label && item.value);

  const links = [
    {
      label: 'Live website',
      value: project.liveUrl,
    },
    {
      label: 'GitHub',
      value: project.githubUrl,
    },
    {
      label: 'Documentation',
      value: project.pdf,
    },
  ].filter((item): item is typeof item & { value: string } => Boolean(item.label && item.value));

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-5xl mx-auto px-5 sm:px-10 pt-2 opacity-0 motion-reduce:opacity-100 "
    >
      <Link
        href={`/projects`}
        className="inline-flex items-center gap-2 text-xs text-ink-2/80 transition-colors duration-200 hover:text-ink"
      >
        <IconArrowLeft size={18} stroke={2} />
        {t('back')}
      </Link>
      <p className="mt-6 text-xs uppercase tracking-[0.30em] text-accent">
        {translation.tags.length > 0 && translation.tags.join(' • ')}
      </p>
      <h1 className="mt-2 text-4xl font-bold md:text-5xl">{translation.title}</h1>
      <p className="mt-4 max-w-2xl font-extralight leading-relaxed text-ink/90">
        {translation.subtitle}
      </p>
      <div className="mt-8 flex flex-col md:flex-row md:items-stretch gap-4 md:gap-6">
        {project.featuredPhoto && (
          <div className="flex min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-line md:flex-1 bg-card/55 p-3">
            <Image
              src={project.featuredPhoto}
              alt={translation.title}
              width={1920}
              height={1080}
              loading="eager"
              className="max-h-72 md:max-h-96 w-auto max-w-full overflow-hidden rounded-2xl"
            />
          </div>
        )}
        {[
          { label: translation.stat1, value: translation.stat1Value },
          { label: translation.stat2, value: translation.stat2Value },
          { label: translation.stat3, value: translation.stat3Value },
        ].filter((stat) => stat.label && stat.value).length > 0 && (
          <div className="grid grid-cols-3 divide-x divide-line bg-card/55 border border-line rounded-2xl md:flex md:w-56 md:divide-x-0 md:shrink-0 md:flex-col md:divide-y">
            {[
              { label: translation.stat1, value: translation.stat1Value },
              { label: translation.stat2, value: translation.stat2Value },
              { label: translation.stat3, value: translation.stat3Value },
            ]
              .filter((stat) => stat.label && stat.value)
              .map((stat, index) => (
                <div key={index} className="flex flex-col justify-center p-3 md:flex-1 md:p-5">
                  <p className="text-xl font-bold md:text-2xl text-accent truncate md:whitespace-normal md:overflow-visible md:text-clip">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[0.55rem] text-ink-2 md:text-xs">{stat.label}</p>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          {translation.overview && (
            <>
              <h2 className="text-lg md:text-xl font-bold">{t('overview')}</h2>
              <p className="mt-4 text-sm font-extralight leading-relaxed text-ink/90 md:text-base whitespace-pre-line">
                {translation.overview}
              </p>
            </>
          )}
          {translation.highlights.some(Boolean) && (
            <ul className="mt-8 space-y-3">
              <h2 className="text-lg md:text-xl font-bold">{t('highlights')}</h2>
              {translation.highlights.map((h, i) => (
                <li className="flex gap-3" key={i}>
                  <span className="mt-2 size-1.5 bg-accent rounded-full shrink-0" />
                  <span className="text-sm text-ink/90 font-extralight leading-relaxed md:text-base">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <aside className="flex h-fit flex-col gap-6 lg:sticky lg:top-28">
          {details.length > 0 && (
            <div className="group divide-y divide-line rounded-2xl border border-line bg-card/55 p-5 transition-colors duration-200 hover:border-accent-dark hover:divide-accent-dark">
              {details.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 py-3">
                  <p className="text-[0.60rem] uppercase tracking-[0.25em] text-ink-2">
                    {item.label}
                  </p>

                  <p className="text-right text-sm font-medium">
                    <span className="inline-flex gap-1.5 items-center">
                      {item.icon && <>{item.icon}</>}
                      {item.value}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
          {project.stack.some(Boolean) && (
            <div className="group rounded-2xl border border-line bg-card/55 p-5 transition-colors duration-200 hover:border-accent-dark hover:divide-accent-dark">
              <p className="text-[0.60rem] uppercase tracking-[0.25em] text-ink-2">Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs border text-ink/90 bg-surface-2/50 border-line px-2 py-1 rounded-md group-hover:border-accent-dark"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {links.length > 0 && (
            <div className="rounded-2xl border border-line bg-card/55 p-5 transition-colors duration-200 hover:border-accent-dark hover:divide-accent-dark">
              <p className="text-[0.60rem] uppercase tracking-[0.25em] text-ink-2">{t('links')}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {links.map((link) => (
                  <div
                    key={link.label}
                    className="group flex items-center justify-start border border-line w-full rounded-md bg-surface-2/50 cursor-pointer px-4 py-2 transition-transform duration-200 hover:translate-x-1 hover:border-accent-hover"
                  >
                    <IconExternalLink
                      size={20}
                      className="mr-2 text-accent transition-colors duration-200 group-hover:text-accent-hover"
                    />
                    <Link
                      href={link.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
};

export default ProjectView;
