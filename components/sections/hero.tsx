'use client';
import AnimatedCircle from '../ui/animated-circle';
import { useEffect } from 'react';
import { animate, scrambleText } from 'animejs';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconChevronRight,
} from '@tabler/icons-react';
import Image from 'next/image';

const HeroSection = () => {
  const t = useTranslations('hero');
  useEffect(() => {
    animate('#scramble', {
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
    <main className="relative min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <div className="xl:pb-20">
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
                    <span className="text-2xl">Fullstack Developer</span>
                    <div className="text-7xl font-bold leading-tight mb-6">
                      {' '}
                      <p>{t('title')}</p>
                      <p id="scramble" className="text-accent">
                        {t('firstname')}
                      </p>
                      <p id="scramble" className="text-accent">
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
                          >
                            <IconBrandGithub />
                          </a>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/m%C3%A1rton-ruzsik-47561b313/"
                            className="link-buttons"
                          >
                            <IconBrandLinkedin />
                          </a>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.facebook.com/marton.ruzsik/"
                            className="link-buttons"
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
                    <AnimatedCircle />
                    <div className="w-full h-full rounded-full p-3 shadow-md shadow-accent">
                      <div className="w-full h-full rounded-full relative overflow-hidden">
                        <Image
                          src="/github.webp"
                          alt="Me"
                          className="rounded-full object-cover"
                          width={500}
                          height={500}
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
