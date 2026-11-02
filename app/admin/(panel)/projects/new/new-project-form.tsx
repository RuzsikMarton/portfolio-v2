'use client';
import { useActionState } from 'react';
import { createProject, type FormState } from '../actions';
import { IconArrowRight } from '@tabler/icons-react';

const NewProjectForm = () => {
  // new project only has title and slug
  const [state, action, pending] = useActionState<FormState, FormData>(createProject, {});
  return (
    <form action={action} className="container-page max-w-2xl space-y-8">
      <div>
        <label className="field-label">Title</label>
        <input
          id="title"
          name="title"
          required
          maxLength={50}
          placeholder="Project title"
          className="field-input"
        />
        <p className="mt-2 text-base text-ink-2">(It will be shown as the project name)</p>
      </div>
      <div>
        <label className="field-label">Slug</label>
        <input
          id="slug"
          name="slug"
          required
          maxLength={20}
          placeholder="project-slug"
          className="field-input"
        />
        <p className="mt-2 text-base text-ink-2">(Used in the URL)</p>
      </div>

      <p role="alert" className="text-danger min-h-6 text-base font-medium">
        {state.error}
      </p>
      <button type="submit" className="primary-button w-full">
        {pending ? 'Saving...' : 'Create'}
        <IconArrowRight />
      </button>
    </form>
  );
};

export default NewProjectForm;
