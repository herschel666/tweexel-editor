import { it, expect } from 'vitest';
import { h } from 'preact';
import { render } from '@testing-library/preact';

import { App } from '.';

it.fails('renders the app', async () => {
  const { queryByText } = render(<App />);
  const heading = await queryByText('tweexel', { selector: 'h1' });

  expect(heading).not.toBeNull();
});
