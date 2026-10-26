import { getLocale } from 'next-intl/server';

const ResumePage = async () => {
  const locale = await getLocale();
  const pdfError = true;

  const getPdfSrc = () => {
    const lang = locale || 'en';
    return `/cv/${lang}`;
  };

  const getFallbackPdfSrc = () => {
    return '/cv/MLRuzsik_CVen.pdf';
  };

  // To DO get pdf from server based on locale
  return (
    <div className="h-screen overflow-hidden">
      {!pdfError ? (
        <iframe
          id="pdfEmbed"
          src={getPdfSrc()}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="CV PDF"
        />
      ) : (
        <iframe
          id="pdfEmbed"
          src={getFallbackPdfSrc()}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="CV PDF"
        />
      )}
    </div>
  );
};

export default ResumePage;
