import { getResume } from '@/lib/queries';

const ResumeViewer = async () => {
  const cvUrl = await getResume();
  const fallbackPdf = '/resume/MLRuzsik_CVsk.pdf';

  return (
    <main className="w-full min-w-0 overflow-hidden">
      <div className="h-[calc(100dvh-5rem)] w-full overflow-hidden">
        <iframe
          src={`${cvUrl}#view=FitH`}
          title="My Resume"
          className="block h-full w-full border-0"
        />
      </div>
    </main>
  );
};

export default ResumeViewer;
