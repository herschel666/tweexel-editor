import { it, expect } from 'vitest';
import { h } from 'preact';
import { render } from '@testing-library/preact';

import { AboutPage } from '.';

// TODO: ditch this in favor of `app.about.test.tsx` when the preact imports are correct again.
it('renders the About page', async () => {
  const { findByText } = render(<AboutPage />);
  const heading = await findByText(
    /Twitter has 9 colored square emojis, that you can use to create tweetable pixel art/
  );

  expect(heading).toBeDefined();
});
