import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync('app/globals.css', 'utf8');

function block(selector: string) {
  const start = css.indexOf(selector);

  if (start === -1) {
    throw new Error(`CSS selector not found: ${selector}`);
  }

  const open = css.indexOf('{', start);
  const close = css.indexOf('}', open);
  if (open === -1 || close === -1) {
    throw new Error(`Invalid CSS block: ${selector}`);
  }

  const body = css.slice(open + 1, close);

  return Object.fromEntries(
    [...body.matchAll(/--(?:color-)?([\w-]+):\s*(#[0-9a-f]{6}(?:[0-9a-f]{2})?)/gi)].map((m) => [
      m[1],
      m[2].slice(0, 7),
    ])
  );
}

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const pairs: [string, string][] = [
  ['ink', 'bg'],
  ['ink', 'surface'],
  ['ink', 'surface-2'],
  ['ink-2', 'bg'],
  ['ink-2', 'surface'],
  ['ink-2', 'surface-2'],
  ['accent', 'bg'],
  ['accent', 'surface'],
  ['accent-ink', 'accent'],
  ['accent-ink', 'accent-hover'],
  ['secondary', 'bg'],
  ['secondary', 'surface'],
  ['accent-ink', 'secondary'],
  ['accent-ink', 'hover'],
  ['accent-ink', 'hover-dark'],
  ['danger', 'bg'],
  ['danger', 'surface'],
];

describe('color palette', () => {
  const t = block('@theme {');

  for (const [fg, bg] of pairs) {
    it(`${fg} on ${bg} ≥ 4.5`, () => {
      expect(t[fg], `Missing CSS variable: --${fg}`).toBeDefined();
      expect(t[bg], `Missing CSS variable: --${bg}`).toBeDefined();

      expect(ratio(t[fg], t[bg])).toBeGreaterThanOrEqual(4.5);
    });
  }
});
