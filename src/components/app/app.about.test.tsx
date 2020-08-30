import { h } from 'preact';
import type { FunctionComponent } from 'preact';
import type { CustomHistory } from 'preact-router';
import { render } from '@testing-library/preact';

import { App } from '.';

const noop = () => undefined;

jest.mock('preact-router', () => {
  const location = { pathname: '/about/', search: '' };
  const listen = (() => noop as unknown) as CustomHistory['listen'];
  const push = noop;
  const replace = noop;
  const history: CustomHistory = { location, listen, push, replace };
  const Router = jest.requireActual('preact-router');
  const Mock: FunctionComponent = ({ children }) =>
    h(Router, { history }, children);
  const mod = { ...Router, Router: Mock };
  return mod;
});

it('renders the About page', async () => {
  const { findByText } = render(<App />);
  const heading = await findByText(
    /Twitter has 9 colored square emojis, that you can use to create tweetable pixel art/
  );

  expect(heading).toBeDefined();
});
