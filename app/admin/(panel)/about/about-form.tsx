'use client';

import { useActionState } from 'react';
import { updateAbout } from './actions';
import { FormState } from '../projects/actions';
import { IconCheck, IconLoader2 } from '@tabler/icons-react';

interface Props {
  age: string;
  projects: string;
  deployed: string;
  experience: string;
}

const AboutForm = ({ about }: { about: Props }) => {
  const [state, action, pending] = useActionState<FormState, FormData>(updateAbout, {});
  return (
    <form action={action} key={JSON.stringify(about)} className="container-page space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="age" className="field-label">
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            className="field-input"
            defaultValue={about.age}
          />
        </div>
        <div>
          <label htmlFor="experience" className="field-label">
            Experience
          </label>
          <input
            id="experience"
            name="experience"
            type="number"
            className="field-input"
            defaultValue={about.experience}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="projects" className="field-label">
            Projects
          </label>
          <input
            id="projects"
            name="projects"
            type="number"
            className="field-input"
            defaultValue={about.projects}
          />
        </div>
        <div>
          <label htmlFor="deployed" className="field-label">
            Deployed
          </label>
          <input
            id="deployed"
            name="deployed"
            type="number"
            className="field-input"
            defaultValue={about.deployed}
          />
        </div>
      </div>
      <div className="flex max-w-7xl w-full items-center gap-3">
        <button type="submit" disabled={pending} className="primary-button">
          {pending && <IconLoader2 className="animate-spin" />}
          Save
        </button>
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
      </div>
    </form>
  );
};

export default AboutForm;
