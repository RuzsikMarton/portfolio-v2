import { useTranslations } from 'next-intl';

interface EducationCardProps {
  educationType: 'highSchool' | 'bsc' | 'msc';
}

const EducationCard = ({ educationType }: EducationCardProps) => {
  const t = useTranslations(`${educationType}`);

  return (
    <div className="relative h-full w-full p-2 group">
      <div className="rounded-2xl border border-ink/20 h-full w-full p-4 bg-bg hover:border-accent/60 relative z-10 transition-colors duration-200">
        <div className="relative z-50 pointer-events-none">
          <h2 className="text-xl font-bold mb-2">{t('degree')}</h2>
          <h3 className="text-sm text-ink/80 mb-12">{t('year')}</h3>
          <p className="text-ink/70 text-sm">{t('institution')}</p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-bg group-hover:bg-accent/10 rounded-2xl z-0"></div>
      </div>
      <div className="absolute -top-3 -left-3 bg-bg border border-accent text-accent px-3 py-1 rounded-full text-sm font-semibold z-20 pointer-events-none">
        {t('title')}
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-bg group-hover:bg-accent/10 rounded-2xl z-0"></div>
    </div>
  );
};

export default EducationCard;
