import { Suspense } from 'react';
import ResumeViewer from '@/components/ui/resume-viewer';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Márton Ruzsik | Resume' };
}

const ResumePage = async () => {
  // To DO get pdf from server based on locale
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
