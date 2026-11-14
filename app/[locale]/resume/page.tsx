import { Suspense } from 'react';
import ResumeViewer from '@/components/ui/resume-viewer';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Resume | Márton Ruzsik' };
}

const ResumePage = async () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen min-h-[500px] rounded-xl border border-line bg-bg animate-pulse" />
      }
    >
      <ResumeViewer />
    </Suspense>
  );
};

export default ResumePage;
