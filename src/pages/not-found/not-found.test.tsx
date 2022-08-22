import { it, expect, afterAll, vi } from 'vitest';
import { h } from 'preact';
import { render } from '@testing-library/preact';
import * as TextLink from '../../components/text-link';

import { NotFoundPage } from '.';

const spy = vi
  .spyOn(TextLink, 'TextLink')
  .mockImplementation(({ href, children }) => {
    return h('a', { href }, children);
  });

afterAll(() => {
  spy.mockClear();
});

// TODO: ditch this in favor of `app.not-found.test.tsx` when the preact imports are correct again.
it('renders the Not Found page', async () => {
  const { findByText } = render(<NotFoundPage />);
  const heading = await findByText(/Oh noes…\!\! This page does not exist./);

  expect(heading).toBeDefined();
});
