'use client';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { IconGripVertical } from '@tabler/icons-react';

interface Props {
  highlights: string[];
  onChange: (highlights: string[]) => void;
}

// Editor for highlights list
const HighlightEditor = ({ highlights, onChange }: Props) => {
  const updateHighlight = (index: number, value: string) => {
    const updated = [...highlights];
    updated[index] = value;
    onChange(updated);
  };

  const removeHighlight = (index: number) => {
    onChange(highlights.filter((_, i) => i !== index));
  };

  return (
    <DragDropProvider
      onDragEnd={(e) => {
        if (e.canceled) return;
        onChange(move(highlights, e));
      }}
    >
      <ul className="p-2 bg-surface border border-line rounded-control space-y-2">
        {highlights.map((id, index) => (
          <SortableHighlight
            highlight={id}
            index={index}
            key={index}
            onChange={(value) => {
              updateHighlight(index, value);
            }}
            removeHighlight={removeHighlight}
          />
        ))}
        <button
          type="button"
          className="w-full bg-surface-2 px-2 py-3 min-h-14 text-ink-2 text-lg font-semibold hover:text-accent-hover border border-dashed rounded-control border-line hover:border-accent-hover"
          onClick={() => onChange([...highlights, ''])}
        >
          Add
        </button>
      </ul>
    </DragDropProvider>
  );
};

const SortableHighlight = ({
  highlight,
  index,
  onChange,
  removeHighlight,
}: {
  highlight: string;
  index: number;
  onChange: (value: string) => void;
  removeHighlight: (index: number) => void;
}) => {
  const { ref, handleRef } = useSortable({ id: index, index });

  return (
    <li
      ref={ref}
      className="flex justify-between items-center border border-line bg-surface-2 p-2 rounded-lg min-h-1"
    >
      <div className="flex-1 pr-2 md:pr-10 space-y-2">
        <textarea
          value={highlight}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          maxLength={5000}
          className=" field-input bg-surface!"
        />
        {/* Remove button mobile first*/}
        <button
          type="button"
          className="w-full bg-surface px-2 py-3 min-h-14 text-danger text-lg font-semibold border border-dashed rounded-control border-line hover:border-danger/50"
          onClick={() => removeHighlight(index)}
        >
          Remove
        </button>
      </div>
      <div className="cursor-pointer">
        <IconGripVertical ref={handleRef} size={28} className="text-ink-2" />
      </div>
    </li>
  );
};

export default HighlightEditor;
