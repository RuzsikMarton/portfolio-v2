'use client';

import { uploadCV, deleteCv } from '@/app/admin/(panel)/resumes/actions';
import { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';
import { IconExternalLink, IconFileTypePdf, IconTrash, IconUpload } from '@tabler/icons-react';
import { useRef, useState, useTransition } from 'react';

interface Props {
  resumes: {
    cvSkUrl: string | null;
    cvEnUrl: string | null;
    cvHuUrl: string | null;
  };
}

const resumeFields = [
  { locale: 'sk', label: 'Slovak', key: 'cvSkUrl' },
  { locale: 'en', label: 'English', key: 'cvEnUrl' },
  { locale: 'hu', label: 'Hungarian', key: 'cvHuUrl' },
] as const;

const ResumeEdit = ({ resumes }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [selectedLocale, setSelectedLocale] = useState<Locale | null>(null);

  const uploadResume = async (file: File, locale: Locale) => {
    startTransition(async () => {
      try {
        const res = await uploadCV({ file, locale });

        if (!res.success) {
          setError('Upload failed');
          return;
        }
      } catch (e) {
        setError('Upload error: ' + (e as Error).message);
      }
    });
  };

  const deleteResume = async (url: string, locale: Locale) => {
    startTransition(async () => {
      try {
        await deleteCv(url, locale);
      } catch (e) {
        setError('Delete error: ' + (e as Error).message);
      }
    });
  };

  return (
    <div className="container-page max-w-2xl space-y-8">
      <p className="text-lg font-semibold text-ink-2">
        Manage the PDF versions displayed on portfolio.
      </p>
      {error && <p className="text-danger">{error}</p>}

      {resumeFields.map(({ locale, label, key }) => {
        const url = resumes[key];

        return (
          <div key={locale} className="flex flex-col border border-line rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-lg">{label}</span>

              <span
                className={cn(
                  'text-sm rounded-full px-3 py-1',
                  url ? 'bg-green-700/30 text-green-600' : 'bg-danger/30 text-danger'
                )}
              >
                {url ? 'Uploaded' : 'None'}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap justify-between items-center gap-2 text-ink-2">
              <div className="flex gap-2 items-center">
                <IconFileTypePdf className="text-red-400 size-8" />

                <div className={cn('text-sm', url ? 'text-ink' : 'text-ink-2')}>
                  {url ? url.slice(-8) : 'No file uploaded yet'}
                  <p className="text-xs font-extralight">PDF document</p>
                </div>
              </div>

              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${label} CV`}
                >
                  <IconExternalLink className="size-6" />
                </a>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file && selectedLocale) {
                  uploadResume(file, selectedLocale);
                }

                // Allows selecting the same file again
                e.target.value = '';
              }}
            />

            <div className="mt-4 flex gap-4">
              <button
                type="button"
                className="secondary-button w-full"
                disabled={isPending}
                onClick={() => {
                  setSelectedLocale(locale);
                  fileInputRef.current?.click();
                }}
              >
                <IconUpload />
                {url ? 'Replace' : 'Upload'}
              </button>

              {url && (
                <button
                  type="button"
                  disabled={isPending}
                  className="secondary-button text-sm text-danger border-danger/50 hover:border-danger"
                  onClick={() => {
                    deleteResume(url, locale);
                  }}
                  aria-label={`Delete ${label} CV`}
                >
                  <IconTrash />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResumeEdit;
