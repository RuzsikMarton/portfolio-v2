'use client';

import { animate } from 'animejs';
import { useEffect, useRef } from 'react';
import {
  Docker,
  Drizzle,
  Fastapi,
  Postgresql,
  Prisma,
  Python,
  React,
  ShadcnUi,
  Vitest,
  Zod,
  Nextdotjs,
  Kubernetes,
  Tailwindcss,
  Javascript,
  Postman,
  Mongodb,
} from '@thesvg/react';
import SpinIcon from '../animations/spin-icon';
import { useTranslations } from 'next-intl';
import TypescriptSvg from '@/components/icons/ts';
import NodeSvg from '@/components/icons/node';

const TechSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('tech');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        animate(section, {
          translateY: [100, 0],
          opacity: [0, 1],
          duration: 1000,
          ease: 'easeOut',
        });
        observer.disconnect();
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
  }, []);

  return (
    <section ref={sectionRef} className="reveal-section my-12">
      <div className="container w-full h-full mx-auto">
        <div className="grid lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4 mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold">{t('title')}</h2>
            <p className="text-sm text-ink-2">{t('description')}</p>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col items-center gap-4">
              <Nextdotjs variant="wordmark" className="w-30 h-20 logo" />
              <Tailwindcss variant="wordmark" className="w-30 h-20 logo" />
              <Prisma variant="mono" className="size-10 logo" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <TypescriptSvg />
              <NodeSvg />
              <Postgresql variant="wordmarkDark" className="w-30 h-20 logo" />
            </div>
          </div>
        </div>
        <div className="mt-12 space-y-4">
          <h3 className="text-xl font-semibold text-center underline underline-offset-2 decoration-accent">
            {t('subtitle')}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-8">
            <SpinIcon>
              <Javascript variant="mono" className="size-10" />
            </SpinIcon>
            <SpinIcon>
              <React variant="mono" className="size-10" />
            </SpinIcon>
            <SpinIcon>
              <Drizzle variant="mono" className="size-10" />
            </SpinIcon>
            <SpinIcon>
              <Mongodb variant="mono" className="size-10" />
            </SpinIcon>
            <SpinIcon>
              <ShadcnUi variant="mono" className="size-10" />
            </SpinIcon>
            <SpinIcon>
              <Zod variant="mono" className="size-10" />
            </SpinIcon>
            <SpinIcon>
              <Vitest variant="mono" className="size-10 spin" />
            </SpinIcon>
            <SpinIcon>
              <Docker variant="mono" className="size-10" />
            </SpinIcon>
            <SpinIcon>
              <Kubernetes variant="mono" className="size-10" />
            </SpinIcon>
            <SpinIcon>
              <Postman variant="mono" className="size-10" />
            </SpinIcon>
            <SpinIcon>
              <Python variant="mono" className="size-10" />
            </SpinIcon>
            <SpinIcon>
              <Fastapi variant="mono" className="size-10" />
            </SpinIcon>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
