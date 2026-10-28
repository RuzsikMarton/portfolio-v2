'use client';

import { animate } from 'animejs';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const t = useTranslations('projects');

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
    <section id="projects" ref={sectionRef} className="reveal-section mt-24">
      <div className="container w-full h-full mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="flex-1 h-0.5 bg-accent " />
          <h2 className="text-xl font-semibold">{t('title')}</h2>
          <span className="flex-1 h-0.5 bg-accent " />
        </div>
        <div className="flex items-center justify-center">
          <button className="self-center px-4 py-2 font-semibold border-2 border-accent rounded-full text-accent bg-transparent hover:text-bg hover:bg-accent active:scale-[0.97] transition-all duration-150 active:bg-hover active:border-hover cursor-pointer">
            {t('button')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
