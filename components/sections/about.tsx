'use client';

import { animate } from 'animejs';
import { ReactNode, useEffect, useRef } from 'react';
import EducationSection from './education';

const AboutSection = ({ children }: { children: ReactNode }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    let animation: ReturnType<typeof animate> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        animation = animate(section, {
          translateY: [50, 0],
          opacity: [0, 1],
          duration: 800,
          ease: 'easeOut',
        });
        observer.disconnect();
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      animation?.revert();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="reveal-section">
      <div className="container h-full w-full mx-auto mt-12">
        {children}
        <EducationSection />
      </div>
    </section>
  );
};

export default AboutSection;
