'use client';

import { IconX } from '@tabler/icons-react';
import { useState } from 'react';

interface Props {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}
const TagInput = ({ value, onChange, placeholder }: Props) => {
  const [input, setInput] = useState('');

  const addTag = () => {
    const tag = input.trim();

    if (!tag || value.some((item) => item.toLowerCase() === tag.toLowerCase())) {
      setInput('');
      return;
    }

    onChange([...value, tag]);
    setInput('');
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
    if (e.key === 'Backspace' && !input && value.length > 0) removeTag(value.length - 1);
  };
  return (
    <div className="field-input flex min-h-12 flex-wrap items-center gap-2">
      {value.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="inline-flex items-center gap-1 rounded-full bg-accent-dark px-3 py-1 text-sm font-medium text-accent"
        >
          {tag}

          <button
            type="button"
            onClick={() => removeTag(index)}
            aria-label={`Remove ${tag}`}
            className="rounded-full hover:text-danger"
          >
            <IconX size={14} />
          </button>
        </span>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={value.length === 0 ? placeholder : ''}
        className="min-w-28 flex-1 border-none bg-transparent outline-none"
      />
    </div>
  );
};

export default TagInput;
