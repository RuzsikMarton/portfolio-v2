'use client';
import AnimatedCircle from '../animations/animated-circle';
import { useEffect } from 'react';
import { animate, scrambleText } from 'animejs';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconChevronRight,
} from '@tabler/icons-react';
import Image from 'next/image';

const HeroSection = () => {
  const t = useTranslations('hero');
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const borderRef = useRef(null);
  const shadowRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (
      !firstnameRef.current ||
      !lastnameRef.current ||
      !borderRef.current ||
      !shadowRef.current ||
      !imageRef.current
    )
      return;

    animate(shadowRef.current, {
      opacity: [0, 1],
      duration: 1000,
      delay: 1000,
      ease: 'out(2)',
    });
    animate(borderRef.current, {
      opacity: [0, 1],
      duration: 1000,
      delay: 1300,
      ease: 'out(2)',
    });
    animate(imageRef.current, {
      opacity: [0, 1],
      duration: 2000,
      delay: 1600,
      ease: 'out(2)',
    });
    animate([firstnameRef.current, lastnameRef.current], {
      innerHTML: scrambleText({
        revealRate: 2,
        duration: 4000,
        ease: 'outCirc',
        from: 'random',
        settleDuration: 2000,
      }),
    });
  }, []);

  return (
    <main className="relative min-h-screen bg-bg flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <div className="xl:pb-8">
          <div
            aria-hidden="true"
            className="h-screen w-full bg-bg pointer-events-none absolute inset-0 bg-grid-white"
          >
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-bg [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />
          </div>
          <div className="flex justify-center relative z-5">
            <div className="container mx-auto w-full">
              <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
                <div className="text-center xl:text-left order-2 xl:order-none">
                  <div className="leading-loose">
                    <span title="Fullstack Developer" className="text-2xl">
                      Fullstack Developer
                    </span>
                    <div title="Márton Ruzsik" className="text-7xl font-bold leading-tight mb-6">
                      {' '}
                      <p>{t('title')}</p>
                      <p ref={firstnameRef} className="text-accent">
                        {t('firstname')}
                      </p>
                      <p ref={lastnameRef} className="text-accent">
                        {t('lastname')}
                      </p>
                    </div>
                    <div className="mb-9 text-white/80 max-w-125 leading-loose">{t('motto')}</div>
                    <div className="flex flex-col xl:flex-row gap-6 xl:items-center">
                      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center text-sm">
                        <Link
                          href={'/resume'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-5 py-3 gap-2 uppercase text-accent border-2 border-accent rounded-full font-bold bg-transparent hover:text-bg hover:bg-accent active:scale-[0.97] transition-all duration-150 active:bg-hover active:border-hover"
                        >
                          {t('cv')}
                          <IconChevronRight size={16} />
                        </Link>
                        <Link
                          href="#contact"
                          className="px-5 py-3 text-accent-ink bg-accent border rounded-full font-bold hover:bg-hover active:scale-[0.97] transition-all duration-150"
                        >
                          {t('contact')}
                        </Link>
                        <div className="flex justify-center xl:justify-start gap-4 items-center">
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
                    </div>
                  </div>
                </div>
                <div className="order-1 xl:order-0 mb-8 xl:mb-0 flex justify-center xl:justify-start">
                  <div className="relative w-72 h-72 xl:w-120 xl:h-120">
                    <AnimatedCircle borderRef={borderRef} />
                    <div
                      className="w-full h-full rounded-full p-3 shadow-md shadow-accent opacity-0"
                      ref={shadowRef}
                    >
                      <div className="w-full h-full rounded-full relative overflow-hidden">
                        <Image
                          src="/github.webp"
                          alt="Me"
                          className="rounded-full object-cover opacity-0"
                          width={500}
                          height={500}
                          preload
                          ref={imageRef}
                          fetchPriority="high"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
