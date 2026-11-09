'use client';

import { useState } from 'react';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { IconGripVertical, IconX } from '@tabler/icons-react';

interface Highlight {
  id: string;
  text: string;
}

interface Props {
  highlights: string[];
  onChange: (highlights: string[]) => void;
}

const HighlightEditor = ({ highlights, onChange }: Props) => {
  const [items, setItems] = useState(() =>
    highlights.map((text) => ({
      id: crypto.randomUUID(),
      text,
    }))
  );

  // Update parent whenever the items change
  const updateItems = (updated: Highlight[]) => {
    setItems(updated);
    onChange(updated.map((item) => item.text));
  };

  const updateHighlight = (id: string, value: string) => {
    updateItems(items.map((item) => (item.id === id ? { ...item, text: value } : item)));
  };

  const removeHighlight = (id: string) => {
    updateItems(items.filter((item) => item.id !== id));
  };

  const addHighlight = () => {
    updateItems([
      ...items,
      {
        id: crypto.randomUUID(),
        text: '',
      },
    ]);
  };

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        updateItems(move(items, event));
      }}
    >
      <div className="space-y-3">
        <ul className="space-y-3">
          {items.map((item, index) => (
            <SortableHighlight
              key={item.id}
              highlight={item}
              index={index}
              onChange={(value) => updateHighlight(item.id, value)}
              onRemove={() => removeHighlight(item.id)}
            />
          ))}
        </ul>

        <button
          type="button"
          onClick={addHighlight}
          className="w-full bg-surface-2 px-3 py-3 min-h-14 text-ink-2 font-semibold hover:text-accent-hover border border-dashed rounded-control border-line hover:border-accent-hover"
        >
          + Add highlight
        </button>
      </div>
    </DragDropProvider>
  );
};

interface SortableHighlightProps {
  highlight: Highlight;
  index: number;
  onChange: (value: string) => void;
  onRemove: () => void;
}

const SortableHighlight = ({ highlight, index, onChange, onRemove }: SortableHighlightProps) => {
  const { ref, handleRef } = useSortable({
    id: highlight.id,
    index,
  });

  return (
    <li
      ref={ref}
      className="flex items-start gap-3 border border-line bg-surface-2 p-3 rounded-control"
    >
      <button
        ref={handleRef}
        type="button"
        aria-label="Drag to reorder"
        className="mt-2 shrink-0 cursor-grab touch-none text-ink-2 hover:text-accent-hover active:cursor-grabbing"
      >
        <IconGripVertical size={24} />
      </button>

      <div className="min-w-0 flex-1 space-y-2">
        <textarea
          value={highlight.text}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          maxLength={5000}
          className="field-input w-full bg-surface! resize-y"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 text-sm font-medium text-danger hover:text-danger/70"
          >
            <IconX size={16} />
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default HighlightEditor;
