import MovingGradients from '@/components/ui/moving-gradients';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MovingGradients />
      {children}
    </>
  );
}
