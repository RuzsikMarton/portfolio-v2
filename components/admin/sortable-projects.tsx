'use client';

import { IconGripVertical } from '@tabler/icons-react';
import Link from 'next/link';
import { useSortable } from '@dnd-kit/react/sortable';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { cn } from '@/lib/utils';
import { useState, useTransition } from 'react';
import { reorderProjects } from '@/app/admin/(panel)/projects/actions';

interface Props {
  id: number;
  title: string;
  slug: string;
  order: number;
  _count: {
    projectTranslations: number;
  };
}

const SortableProjects = ({ projects }: { projects: Props[] }) => {
  const [items, setItems] = useState(projects);
  const [pending, startTransition] = useTransition();
  return (
    <>
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const nextItems = move(items, event);
          if (nextItems.every((item, i) => item.id === items[i]?.id)) {
            return;
          }

          setItems(nextItems);

          startTransition(async () => {
            const result = await reorderProjects(nextItems.map((i) => i.id));
            if (result?.error) {
              setItems(projects);
            }
          });
        }}
      >
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((project, index) => (
            <SortableItem project={project} key={project.id} index={index} pending={pending} />
          ))}
        </ul>
      </DragDropProvider>
      {pending && (
        <p className="mt-3 text-sm text-ink-2" aria-live="polite">
          Saving order...
        </p>
      )}
    </>
  );
};

export default SortableProjects;

const SortableItem = ({
  project,
  index,
  pending,
}: {
  project: Props;
  index: number;
  pending: boolean;
}) => {
  const { ref, handleRef, isDragging } = useSortable({ id: project.id, index, disabled: pending });

  return (
    <li
      key={project.id}
      ref={ref}
      className={cn(
        'flex justify-between p-4 border-2 border-line rounded-lg bg-bg',
        isDragging && 'opacity-50'
      )}
    >
      <Link href={`/admin/projects/${project.id}`} className="min-w-0 flex-1">
        <p className="line-clamp-2 text-lg leading-snug font-bold">{project.title}</p>
        <p className="text-base text-ink-2">{project.slug}</p>
        <p className="text-sm text-ink-2">{project._count.projectTranslations} translations</p>
      </Link>
      <div ref={handleRef} className="shrink-0 size-6 cursor-pointer">
        <IconGripVertical className="text-ink-2" />
      </div>
    </li>
  );
};
