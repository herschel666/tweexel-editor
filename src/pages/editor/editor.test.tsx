import { it, expect, afterEach } from 'vitest';
import { h } from 'preact';
import { render, cleanup } from '@testing-library/preact';

import { EditorPage } from '.';

afterEach(cleanup);

it('renders a 16×8 canvas by default', async () => {
  const { findAllByTestId } = render(<EditorPage />);
  const pixels = await findAllByTestId('tweexel');

  expect(pixels.length).toBe(16 * 8);
});

it('renders a 12×9 canvas from URL param', async () => {
  const width = 12;
  const height = 9;
  const { findAllByTestId } = render(
    <EditorPage matches={{ size: [width, height].join('-') }} />
  );
  const pixels = await findAllByTestId('tweexel');

  expect(pixels.length).toBe(width * height);
});

it('renders a 16×8 fallback when the URL size is bullshit', async () => {
  const { findAllByTestId } = render(
    <EditorPage matches={{ size: 'nonsense' }} />
  );
  const pixels = await findAllByTestId('tweexel');

  expect(pixels.length).toBe(16 * 8);
});
