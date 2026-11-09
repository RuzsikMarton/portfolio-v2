'use client';

import { animate } from 'animejs';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
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
  const educationTypes = ['highSchool', 'bsc', 'msc'] as const;

  const itemsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const educationContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const highlightRef = useRef<HTMLDivElement>(null);
  const highlightAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        animate(section, {
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
  }, []);

  const moveHighlight = (index: number) => {
    const card = cardRefs.current[index];
    const container = educationContainerRef.current;
    const highlight = highlightRef.current;

    if (!card || !container || !highlight) return;

    highlightAnimation.current?.cancel();

    const cardRect = card.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const x = cardRect.left - containerRect.left;
    const y = cardRect.top - containerRect.top;

    // First hover: appear directly under the card.
    if (activeCard === null) {
      highlight.style.transform = `translate(${x}px, ${y}px)`;
      highlight.style.width = `${cardRect.width}px`;
      highlight.style.height = `${cardRect.height}px`;

      highlightAnimation.current = animate(highlight, {
        opacity: [0, 1],
        duration: 200,
        ease: 'out(2)',
      });
    } else {
      // Subsequent hovers: slide to the next card.
      highlightAnimation.current = animate(highlight, {
        translateX: x,
        translateY: y,
        width: cardRect.width,
        height: cardRect.height,
        opacity: 1,
        duration: 500,
        ease: 'out(3)',
      });
    }

    setActiveCard(index);
  };

  const hideHighlight = () => {
    setActiveCard(null);
    highlightAnimation.current?.cancel();

    if (highlightRef.current) {
      highlightAnimation.current = animate(highlightRef.current, {
        opacity: 0,
        duration: 200,
        ease: 'out(2)',
      });
    }
  };

  return (
    <section id="about" ref={sectionRef} className="reveal-section">
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
        <div
          ref={educationContainerRef}
          onMouseLeave={hideHighlight}
          className="relative grid grid-cols-1 gap-6 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-4"
        >
          <div
            ref={highlightRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-0 rounded-2xl bg-accent/10 opacity-0"
          />

          {educationTypes.map((type, index) => (
            <div
              key={type}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onMouseEnter={() => moveHighlight(index)}
              className="relative z-10"
            >
              <EducationCard educationType={type} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
