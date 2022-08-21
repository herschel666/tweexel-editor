import { h } from 'preact';
import { render } from '@testing-library/preact';

import { App } from '.';

it('renders the app', async () => {
  const { findByText } = render(<App />);
  const heading = await findByText('tweexel', { selector: 'h1' });

  expect(heading).toBeDefined();
});
