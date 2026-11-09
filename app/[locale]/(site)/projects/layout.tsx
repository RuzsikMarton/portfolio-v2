import MovingGradients from '@/components/animations/moving-gradients';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MovingGradients />
      {children}
    </>
  );
}
