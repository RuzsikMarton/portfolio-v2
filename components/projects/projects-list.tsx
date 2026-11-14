'use client';

import { Link } from '@/i18n/navigation';
import { ProjectWithTranslation } from '@/lib/types';
import { IconArrowLeft, IconArrowUpRight, IconPhotoOff } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { MovingBorder } from '../animations/moving-border';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

interface Props {
  projects: ProjectWithTranslation[];
}

const ProjectsList = ({ projects }: Props) => {
  const t = useTranslations('projectsPage');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>('.reveal');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      items.forEach((item) => {
        if (item) {
          item.style.opacity = '1';
          item.style.transform = 'none';
        }
      });
      section.style.opacity = '1';
      return;
    }

    items.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-50px)';
    });

    const sectionAnimaton = animate(section, {
      opacity: [0, 1],
      duration: 800,
      ease: 'in(3)',
      onComplete: () => {
        animate(items, {
          opacity: [0, 1],
          translateX: [-50, 0],
          delay: stagger(200),
          ease: 'out(3)',
          duration: 800,
        });
      },
    });

    return () => {
      sectionAnimaton.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full mx-auto max-w-5xl pb-24 pt-2 px-2 opacity-0">
      <Link
        href={'/'}
        className="inline-flex items-center gap-2 text-xs text-ink-2/80 transition-colors duration-200 hover:text-ink"
      >
        <IconArrowLeft size={18} stroke={2} />
        {t('back')}
      </Link>
      <div className="mt-10 flex flex-col">
        <h1 className="text-2xl sm:text-4xl font-bold max-w-2xl">
          {t.rich('header', {
            products: (chunks) => <span className="text-accent">{chunks}</span>,
            experiments: (chunks) => <span className="text-accent">{chunks}</span>,
            experiences: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </h1>
        <div className="flex justify-between items-center mt-2">
          <span className="text-ink-2 self-end">{t('description')}</span>
          <div className="hidden sm:flex sm:flex-col items-end">
            <span className="font-bold text-3xl">
              {projects.length.toString().padStart(2, '0')}
            </span>
            <span className="text-ink-2 text-sm">{t('projects')}</span>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        {projects.map((p, i) => (
          <Link
            href={`/projects/${p.slug}`}
            className="relative reveal group block overflow-hidden rounded-3xl bg-transparent border border-white/10 p-px opacity-0 transition-[transform,background-color] duration-200 ease-out hover:border-white/20 active:scale-99" //bg-[#1a1a26] optional bg
            key={p.id}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ borderRadius: '1.5rem' }}
            >
              <MovingBorder rx="24px" ry="24px" duration={4000} />
            </div>
            <div className="relative grid gap-5 p-3 sm:grid-cols-[220px_1fr] rounded-[calc(1.5rem-1px)] bg-[#1a1a26]/50 backdrop-blur-xl sm:p-5">
              <div className="relative h-40 overflow-hidden rounded-2xl border border-line sm:h-full sm:min-h-40">
                {p.featuredPhoto ? (
                  <Image
                    src={p.featuredPhoto}
                    fill
                    alt=""
                    sizes="(max-width: 640px) 100vw, 220px"
                    className="object-cover object-top group-hover:scale-102 transition-transform duration-200"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-white/[0.02]">
                    <IconPhotoOff className="size-10 text-ink-2" />
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex justify-between items-baseline gap-4">
                  <p className="text-[10px] font-medium text-accent uppercase tracking-wide">
                    <span className="text-ink-2">{i + 1}.</span>{' '}
                    {p.translation?.tags.map((t) => t).join(' • ')}
                  </p>
                  <p className="hidden shrink-0 gap-1.5 sm:flex items-baseline">
                    <span className="text-xs font-bold tracking-wide text-accent">
                      {p.translation?.stat1Value}
                    </span>
                    <span className="text-[10px] text-ink-2">{p.translation?.stat1}</span>
                  </p>
                </div>
                <h2 className="mt-2 text-xl font-bold text-ink">{p.translation?.title}</h2>
                <p className="mt-1 text-sm font-extralight text-ink-2 line-clamp-2">
                  {p.translation?.subtitle}
                </p>
                <div className="mt-auto flex justify-between gap-3 pt-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {p.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 text-[10px] font-light text-ink border border-line rounded-md bg-surface group-hover:border-white/20"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-accent font-medium shrink-0">
                    {t('view')}
                    <IconArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
