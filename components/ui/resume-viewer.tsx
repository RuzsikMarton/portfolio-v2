import { getResume } from '@/lib/queries';

const ResumeViewer = async () => {
  const resume = await getResume();
  const fallbackPdf = '/resume/MLRuzsik_CVsk.pdf';

  return (
    <div className="h-screen min-h-[500px] overflow-hidden rounded-xl border border-line bg-bg">
      <iframe src={resume ?? fallbackPdf} className="h-full w-full" title="Curriculum Vitae" />
    </div>
  );
};

export default ResumeViewer;
