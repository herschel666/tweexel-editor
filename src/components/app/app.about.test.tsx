import { it, expect, afterAll, vi } from 'vitest';
import { h } from 'preact';
import type { FunctionComponent } from 'preact';
import type { CustomHistory } from 'preact-router';
import { render } from '@testing-library/preact';

import { App } from '.';

vi.mock('preact-router', () => {
  const noop = () => undefined;
  const location = { pathname: '/about/', search: '' };
  const listen = (() => noop as unknown) as CustomHistory['listen'];
  const push = noop;
  const replace = noop;
  const history: CustomHistory = { location, listen, push, replace };
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Router = require('preact-router');
  const Mock: FunctionComponent = ({ children }) =>
    h(Router, { history }, children);
  const mod = { ...Router, Router: Mock };
  return mod;
});

afterAll(() => {
  vi.clearAllMocks();
});

it.fails('renders the About page', async () => {
  const { findByText } = render(<App />);
  const heading = await findByText(
    /Twitter has 9 colored square emojis, that you can use to create tweetable pixel art/
  );

  expect(heading).toBeDefined();
});
