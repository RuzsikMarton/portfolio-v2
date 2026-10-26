'use client';

import { animate } from 'animejs';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import CountUp from '../animations/countup';
import { IconSchool } from '@tabler/icons-react';
import EducationCard from '../ui/education-card';

const AboutSection = () => {
  const t = useTranslations('about');
  const aboutSection = [
    { label: t('age'), value: 27 },
    { label: t('experience'), value: 1 },
    { label: t('projects'), value: 10 },
    { label: t('deployed'), value: 5 },
  ];

  const itemsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      animate(section, {
        translateY: [100, 0],
        opacity: [0, 1],
        duration: 1000,
        ease: 'easeOut',
      });
      observer.disconnect();
    });
    observer.observe(section);
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      <div className="container h-full w-full mx-auto mt-12">
        <div className="group flex flex-wrap gap-6 justify-between mb-32">
          {aboutSection.map((item, i) => (
            <div
              key={item.label}
              ref={(el) => {
                itemsRefs.current[i] = el;
              }}
              className="flex items-center justify-center gap-4 transition-[filter] duration-300 ease-out group-hover:blur-[3px] hover:blur-none!"
            >
              <span className="text-4xl md:text-5xl xl:text-6xl font-extrabold">
                <CountUp value={item.value} />
              </span>
              <span className="text-ink/80 leading-snug max-w-25">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center font-bold text-4xl gap-2">
          <IconSchool className="text-accent size-10" />
          <span>{t('education')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-6 lg:gap-4">
          <EducationCard educationType={'highSchool'} />
          <EducationCard educationType={'bsc'} />
          <EducationCard educationType={'msc'} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
