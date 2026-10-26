'use client';

import { animate, cubicBezier, spring } from 'animejs';
import { useEffect, useRef } from 'react';

type CountUpProps = {
  value: number;
  duration?: number;
};

export default function CountUp({ value, duration = 1500 }: CountUpProps) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = numberRef.current;
    if (!element) return;

    const counter = { value: 0 };
    let animation: ReturnType<typeof animate> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animation = animate(counter, {
          value,
          round: 1,
          duration,
          ease: spring({
            bounce: -0.55,
            duration: 900,
          }),
          onUpdate: () => {
            element.textContent = Math.round(counter.value).toLocaleString();
          },
        });
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animation) animation.cancel();
    };
  }, [value, duration]);

  return <span ref={numberRef}>0</span>;
}
