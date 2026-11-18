import ContactSection from '@/components/sections/contact';
import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import TechSection from '@/components/sections/tech';
import { Suspense } from 'react';
import { getAboutStats, getFeaturedProjects } from '@/lib/queries';
import ErrorBoundary from '@/components/layout/error-boundary';
import AboutStats from '@/components/sections/about-stats';
import AboutSection from '@/components/sections/about';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection>
        <ErrorBoundary title="aboutTitle" description="aboutDesc">
          <Suspense fallback={<AboutStatsSkeleton />}>
            <AboutStatsWrapper />
          </Suspense>
        </ErrorBoundary>
      </AboutSection>
      <TechSection />
      <ErrorBoundary href="projects" title="projectsTitle" description="projectsDesc">
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsWrapper />
        </Suspense>
      </ErrorBoundary>
      <ContactSection />
    </main>
  );
}

const AboutStatsWrapper = async () => {
  const aboutStats = await getAboutStats();

  if (!aboutStats) {
    throw new Error('No stats found');
  }
  return (
    <AboutStats
      about={{
        age: aboutStats.age,
        experience: aboutStats.experience,
        projects: aboutStats.projects,
        deployed: aboutStats.deployed,
      }}
    />
  );
};

const AboutStatsSkeleton = () => {
  return (
    <div className="mb-32 flex animate-pulse flex-wrap justify-between gap-6" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-center gap-4">
          <div className="h-10 w-16 rounded-xl bg-surface-2 md:h-12 xl:h-14" />
          <div className="h-4 w-24 rounded-md bg-surface-2" />
        </div>
      ))}
    </div>
  );
};

const ProjectsWrapper = async () => {
  const featured = await getFeaturedProjects();

  if (!featured) {
    throw new Error('No projects found');
  }
  return <ProjectsSection projects={featured} />;
};

const ProjectsSkeleton = () => {
  return (
    <section className="mt-24" aria-hidden="true">
      <div className="container mx-auto animate-pulse">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="h-0.5 flex-1 bg-surface-2" />
          <div className="h-8 w-40 rounded-xl bg-surface-2" />
          <span className="h-0.5 flex-1 bg-surface-2" />
        </div>
      </div>
      <ul className="container mx-auto mt-12 animate-pulse list-none space-y-20 p-0 md:space-y-32">
        {Array.from({ length: 2 }).map((_, i) => {
          const isOdd = i % 2 === 0;

          return (
            <li key={i} className="relative grid grid-cols-12 items-stretch gap-2">
              <div
                className={cn(
                  'relative z-10 col-span-full row-start-1 flex flex-col justify-center gap-4 p-6 sm:p-10 md:row-end-2 md:p-0',
                  isOdd
                    ? 'md:col-start-7 md:col-end-13 md:items-end'
                    : 'md:col-start-1 md:col-end-8'
                )}
              >
                <div className="h-4 w-20 rounded-md bg-surface-2" />
                <div className="h-8 w-56 rounded-xl bg-surface-2" />
                <div className="h-28 w-full rounded-lg bg-surface-2" />
                <div className="h-4 w-48 rounded-md bg-surface-2" />
              </div>
              <div
                className={cn(
                  'col-span-full row-start-1 min-h-80 rounded-xl bg-surface-2/50 md:row-end-2 md:min-h-95',
                  isOdd ? 'md:col-start-1 md:col-end-8' : 'md:col-start-6 md:col-end-13'
                )}
              />
            </li>
          );
        })}
      </ul>
      <div className="mt-12 flex animate-pulse items-center justify-center">
        <div className="h-10 w-40 rounded-full bg-surface-2" />
      </div>
    </section>
  );
};
