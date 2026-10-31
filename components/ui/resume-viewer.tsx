import { getLocale } from 'next-intl/server';
import { access } from 'node:fs/promises';
import path from 'node:path';

const ResumeViewer = async () => {
  const locale = await getLocale();

  const supportedLocales = ['en', 'sk', 'hu'];
  const lang = supportedLocales.includes(locale) ? locale : 'sk';

  const localizedPdf = `/resume/MLRuzsik_CV${lang}.pdf`;
  const fallbackPdf = '/resume/MLRuzsik_CVsk.pdf';

  const pdfPath = path.join(process.cwd(), 'public', localizedPdf.slice(1));

  let pdfSrc = fallbackPdf;

  try {
    await access(pdfPath);
    pdfSrc = localizedPdf;
  } catch {
    pdfSrc = fallbackPdf;
  }

  return (
    <div className="h-screen min-h-[500px] overflow-hidden rounded-xl border border-line bg-bg">
      <iframe src={pdfSrc} className="h-full w-full" title="Curriculum Vitae" />
    </div>
  );
};

export default ResumeViewer;
