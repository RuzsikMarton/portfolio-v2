import PublicNav from '@/components/layout/public-nav';
import AboutSection from '@/components/sections/about';
import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import TechSection from '@/components/sections/tech';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TechSection />
      <ProjectsSection />
    </>
  );
}
