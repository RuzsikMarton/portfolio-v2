'use client';

import { useTranslations } from 'next-intl';
import CountUp from '../animations/countup';

interface AboutStatsProps {
  about: { age: string; experience: string; projects: string; deployed: string };
}

const AboutStats = ({ about }: AboutStatsProps) => {
  const t = useTranslations('about');
  const stats = [
    { label: t('age'), value: Number(about.age) },
    { label: t('experience'), value: Number(about.experience) },
    { label: t('projects'), value: Number(about.projects) },
    { label: t('deployed'), value: Number(about.deployed) },
  ];

  return (
    <div className="group flex flex-wrap gap-6 justify-between mb-32">
      {stats.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-center gap-4 transition-[filter] duration-300 ease-out group-hover:blur-[3px] hover:blur-none!"
        >
          <span className="text-4xl md:text-5xl xl:text-6xl font-extrabold">
            <CountUp value={item.value} />
          </span>
          <span className="text-ink/80 leading-snug max-w-25">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default AboutStats;
