'use client';

import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconSendFilled,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { animate } from 'animejs';

const ContactSection = () => {
  const t = useTranslations('contact');
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contact = contactRef.current;
    if (!contact) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        animate(contact, {
          translateY: [50, 0],
          opacity: [0, 1],
          duration: 800,
          ease: 'easeOut',
        });
        observer.disconnect();
      },
      { threshold: 0.15 }
    );
    observer.observe(contact);
  }, []);

  return (
    <section id="contact" className="relative bg-bg container mx-auto py-8 mt-24">
      <div ref={contactRef} className="relative flex flex-col items-center z-10 reveal-section">
        <h1 className="text-5xl font-semibold">{t('title')}</h1>
        <p className="text-ink md:mt-10 my-5 text-center max-w-2xl">{t('description')}</p>
        <Link href="mailto:marton.ruzsik@icloud.com" aria-label="Email">
          <span className="relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] focus:outline-none">
            <span className="absolute pointer-events-none inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#242a38_0%,#75c5fb_50%,#242a38_100%)))]" />
            <span className="inline-flex h-full w-full items-center justify-center rounded-lg bg-surface-2 px-7 gap-2 backdrop-blur-3xl font-medium text-white cursor-pointer group">
              {t('button')}
              <IconSendFilled className="size-4 group-hover:-translate-y-10 group-hover:translate-x-10 transition-transform duration-700" />
            </span>
          </span>
        </Link>
        <hr className="my-12" />
      </div>
      <div className="relative flex flex-col md:flex-row justify-between items-center z-10">
        <h2 className="text-xl">Márton László Ruzsik</h2>
        <div className="flex gap-6 mt-3 md:mt-0">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/RuzsikMarton"
            className="link-buttons"
            aria-label="GitHub"
          >
            <IconBrandGithub />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/m%C3%A1rton-ruzsik-47561b313/"
            className="link-buttons"
            aria-label="LinkedIn"
          >
            <IconBrandLinkedin />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/marton.ruzsik/"
            className="link-buttons"
            aria-label="Facebook"
          >
            <IconBrandFacebook />
          </a>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-grid-white">
        <div className="pointer-events-none absolute inset-0 bg-bg mask-[radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />
      </div>
    </section>
  );
};

export default ContactSection;
