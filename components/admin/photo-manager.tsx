'use client';

import {
  FormState,
  uploadFeaturedPhoto,
  uploadLogoPhoto,
} from '@/app/admin/(panel)/projects/actions';
import { IconCheck, IconPhoto, IconUpload } from '@tabler/icons-react';
import Image from 'next/image';
import { useActionState, useRef } from 'react';

interface Props {
  id: number;
  featuredPhoto: string | null;
  logo: string | null;
}

// Manages photo uploads for a project
// maybe more photos later, for now just one per type for each project
const PhotoManager = ({ id, featuredPhoto, logo }: Props) => {
  const inputPhotoRef = useRef<HTMLInputElement>(null);
  const inputLogoRef = useRef<HTMLInputElement>(null);

  const [featuredState, featuredAction, featuredPending] = useActionState<FormState, FormData>(
    uploadFeaturedPhoto.bind(null, id),
    {}
  );

  const [logoState, logoAction, logoPending] = useActionState<FormState, FormData>(
    uploadLogoPhoto.bind(null, id),
    {}
  );
  return (
    <div className="container-page space-y-8">
      <form action={logoAction} className="">
        <label className="field-label">Logo</label>
        <div className="flex gap-3">
          {logo ? (
            <Image
              src={logo}
              alt="Logo"
              width={200}
              height={200}
              className="size-32 rounded-control object-contain"
            />
          ) : (
            <div className="flex size-40 shrink-0 flex-col items-center justify-center gap-3 rounded-control border border-line bg-surface text-ink-2">
              <IconPhoto size={20} />
              <p className="text-sm">No logo</p>
            </div>
          )}
          <input
            ref={inputLogoRef}
            name="logo"
            type="file"
            accept="image/*"
            multiple={false}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            onChange={(e) => {
              if (e.target.files?.length) {
                e.target.form?.requestSubmit();
              }
            }}
          />

          <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between gap-2 md:flex-col md:items-start">
              <span className="text-xs text-ink-2">Recommended size: 200x200</span>
              <span role="status" className="mt-2 text-sm font-semibold">
                {logoState.error ? (
                  <span className="text-danger">{logoState.error}</span>
                ) : logoPending ? (
                  <span className="text-ink-2">Uploading...</span>
                ) : logoState.ok && !logoPending ? (
                  <span className="inline-flex items-center gap-1.5 text-success">
                    <IconCheck size={20} />
                    Saved
                  </span>
                ) : (
                  <span className="text-ink-2">PNG, JPG, WebP</span>
                )}
              </span>
            </div>

            <button
              type="button"
              className="secondary-button w-full md:w-auto"
              onClick={() => inputLogoRef.current?.click()}
            >
              <IconUpload className="mr-2" />
              Upload
            </button>
          </div>
        </div>
      </form>
      <form action={featuredAction} className="space-y-4">
        <label className="field-label">Featured Photo</label>
        {featuredPhoto ? (
          <Image
            src={featuredPhoto}
            alt="Featured"
            className="border border-line rounded-control"
            loading="eager"
            width={1200}
            height={800}
          />
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-control border border-line bg-surface transition-colors hover:border-primary text-ink-2">
            <IconPhoto size={32} />
            <p className="text-lg font-medium">No featured photo uploaded</p>
          </div>
        )}
        <input
          ref={inputPhotoRef}
          name="featured"
          type="file"
          accept="image/*"
          multiple={false}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(e) => {
            if (e.target.files?.length) {
              e.target.form?.requestSubmit();
            }
          }}
        />
        <div className="grid grid-cols-2 space-x-2">
          <div>
            <span className="hidden md:block text-sm text-ink-2">Recommended size: 1200x800</span>
            <p role="status" className="mt-2 text-sm font-semibold">
              {featuredState.error ? (
                <span className="text-danger">{featuredState.error}</span>
              ) : featuredPending ? (
                <span className="text-ink-2">Uploading...</span>
              ) : featuredState.ok && !featuredPending ? (
                <span className="inline-flex items-center gap-1.5 text-success">
                  <IconCheck size={20} />
                  Saved
                </span>
              ) : (
                <span className="text-ink-2">Select an image to upload or replace</span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputPhotoRef.current?.click()}
            className="secondary-button max-h-14"
            disabled={featuredPending}
          >
            <IconUpload className="mr-2" />
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhotoManager;
