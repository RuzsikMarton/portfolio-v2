'use client';

import TagInput from '@/components/admin/tag-input';
import { useActionState, useState, useTransition } from 'react';
import { deleteProject, FormState, updateProject } from '../actions';
import TranslationsTabs from '@/components/admin/translations-tabs';
import { IconCheck } from '@tabler/icons-react';
import { Toggle } from '@/components/admin/toggle';
import HighlightEditor from '@/components/admin/highlight-editor';

type Locale = 'en' | 'hu' | 'sk';

interface Translation {
  id?: number;
  title: string;
  description: string;
  locale: Locale;
  tags: string[];
  overview: string | null;
  highlights: string[];

  stat1: string | null;
  stat2: string | null;
  stat3: string | null;
  stat1Value: string | null;
  stat2Value: string | null;
  stat3Value: string | null;
}
const locales: Locale[] = ['en', 'hu', 'sk'];

const emptyTranslation = (locale: Locale): Translation => ({
  locale,
  title: '',
  description: '',
  tags: [],
  overview: null,
  highlights: [],
  stat1: null,
  stat2: null,
  stat3: null,
  stat1Value: null,
  stat2Value: null,
  stat3Value: null,
});

interface Props {
  id: number;
  title: string;
  slug: string;
  featured: boolean;
  stack: string[];
  githubUrl: string;
  liveUrl: string;
  pdf: string;
  status: string;
  launchedAt: string;
  period: string;
  role: string;
  projectTranslation: Translation[];
}

const ProjectDetailsForm = ({ project }: { project: Props }) => {
  const [state, action, pending] = useActionState<FormState, FormData>(updateProject, {});
  const [stack, setStack] = useState<string[]>(project.stack);
  const [activeLocale, setActiveLocale] = useState<Locale>('en');
  const [translations, setTranslations] = useState<Translation[]>(() =>
    locales.map(
      (locale) =>
        project.projectTranslation.find((t) => t.locale === locale) ?? emptyTranslation(locale)
    )
  );

  const updateTranslation = (
    locale: Locale,
    field: keyof Translation,
    value: string | string[]
  ) => {
    setTranslations((prev) =>
      prev.map((t) => (t.locale === locale ? { ...t, [field]: value } : t))
    );
  };

  const activeTranslation = translations.find(
    (translation) => translation.locale === activeLocale
  )!;

  const [deleting, startDelete] = useTransition();

  return (
    //key: remount on server refresh with fresh data
    <form
      action={action}
      className="container-page max-w-2xl space-y-8" //pb-28
      key={JSON.stringify(project)}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="title" className="field-label">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={project.title}
            className="field-input"
            maxLength={50}
          />
        </div>
        <div>
          <label htmlFor="slug" className="field-label">
            slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            defaultValue={project.slug}
            className="field-input"
            maxLength={20}
          />
        </div>
      </div>
      <div>
        <Toggle
          name="featured"
          label={'Featured'}
          hint={'Check to feature on home page'}
          defaultChecked={project.featured}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="role" className="field-label">
            Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            defaultValue={project.role}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="status" className="field-label">
            Status
          </label>
          <input
            id="status"
            name="status"
            type="text"
            defaultValue={project.status}
            className="field-input"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="period" className="field-label">
            Period
          </label>
          <input
            id="period"
            name="period"
            type="text"
            defaultValue={project.period}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="launchedAt" className="field-label">
            Launched
          </label>
          <input
            id="launchedAt"
            name="launchedAt"
            type="text"
            defaultValue={project.launchedAt}
            className="field-input"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="githubUrl" className="field-label">
            Github
          </label>
          <input
            id="githubUrl"
            name="githubUrl"
            type="text"
            defaultValue={project.githubUrl}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="liveUrl" className="field-label">
            Live Url
          </label>

          <input
            id="liveUrl"
            name="liveUrl"
            type="text"
            defaultValue={project.liveUrl}
            className="field-input"
          />
        </div>
      </div>
      <div className="col-span-2">
        <label htmlFor="stack" className="field-label">
          Stack
        </label>
        <TagInput value={stack} onChange={setStack} />
      </div>

      <div>
        <label className="field-label">Translations</label>
        <TranslationsTabs activeLocale={activeLocale} setActiveLocale={setActiveLocale} />
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="translation-title" className="field-label">
            Title ({activeLocale.toUpperCase()})
          </label>
          <input
            id="translation-title"
            value={activeTranslation.title}
            onChange={(e) => updateTranslation(activeLocale, 'title', e.target.value)}
            className="field-input"
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="translation-description" className="field-label">
            Description
          </label>
          <textarea
            placeholder="Short description"
            id="translation-description"
            value={activeTranslation.description}
            onChange={(e) => updateTranslation(activeLocale, 'description', e.target.value)}
            className="field-input min-h-28 resize-y"
          />
        </div>
        <div>
          <label className="field-label">Tags</label>
          <TagInput
            value={activeTranslation.tags}
            onChange={(value) => updateTranslation(activeLocale, 'tags', value)}
          />
        </div>
        <div>
          <label htmlFor="translation-overview" className="field-label">
            Overview
          </label>
          <textarea
            id="translation-overview"
            placeholder="Longer overview of the project"
            value={activeTranslation.overview ?? ''}
            onChange={(e) => updateTranslation(activeLocale, 'overview', e.target.value)}
            className="field-input min-h-40 resize-y"
          />
        </div>
      </div>
      <div>
        <label className="field-label">Highlights</label>
        <HighlightEditor
          highlights={activeTranslation.highlights}
          onChange={(h) => updateTranslation(activeLocale, 'highlights', h)}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Project statistics</h3>

        {[1, 2, 3].map((number) => {
          const labelField = `stat${number}` as keyof Translation;
          const valueField = `stat${number}Value` as keyof Translation;

          return (
            <div key={number} className="grid grid-cols-2 gap-4">
              <input
                placeholder="Label (e.g. Users)"
                value={(activeTranslation[labelField] as string) ?? ''}
                onChange={(e) => updateTranslation(activeLocale, labelField, e.target.value)}
                className="field-input"
              />

              <input
                placeholder="Value (e.g. 500+)"
                value={(activeTranslation[valueField] as string) ?? ''}
                onChange={(e) => updateTranslation(activeLocale, valueField, e.target.value)}
                className="field-input"
              />
            </div>
          );
        })}

        <input type="hidden" id="stack" name="stack" value={JSON.stringify(stack)} />
        <input
          type="hidden"
          id="projectTranslation"
          name="projectTranslation"
          value={JSON.stringify(translations)}
        />
      </div>
      <div className="border-t border-line pt-6">
        <button
          type="button"
          disabled={deleting}
          className="min-h-12 text-base font-semibold text-danger"
          onClick={() => {
            if (confirm('Delete project?')) startDelete(() => deleteProject(project.id));
          }}
        >
          Delete
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 border-t border-line bg-bg/95 px-4 py-3 backdrop-blur md:sticky md:bottom-0 md:-mx-8 mx:px-8">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <p role="status" className="min-w-0 flex-1 text-base font-semibold">
            {state.error ? (
              <span className="text-danger">{state.error}</span>
            ) : state.ok && !pending ? (
              <span className="inline-flex items-center gap-1.5 text-success">
                <IconCheck size={20} />
                Saved
              </span>
            ) : null}
          </p>
          <button type="submit" className="primary-button" disabled={pending}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProjectDetailsForm;
