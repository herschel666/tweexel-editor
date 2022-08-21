import { h } from 'preact';
import { route } from 'preact-router';
import { render } from '@testing-library/preact';

import { STORAGE_KEY_SIZE } from '../../constants';
import { RedirectToEditor } from '.';

jest.mock('preact-router', () => {
  const pkg = jest.requireActual('preact-router');
  const route = jest.fn();
  return {
    ...pkg,
    route,
  };
});

describe('redirecting to the default size', () => {
  afterAll(() => jest.clearAllMocks());

  it('redirects to the default size', () => {
    render(<RedirectToEditor />);

    expect(route).toHaveBeenCalledWith('/size/16-8/', true);
  });
});

describe('redirecting to the stored size', () => {
  beforeAll(() => {
    sessionStorage[STORAGE_KEY_SIZE] = '[8, 16]';
  });

  afterAll(() => jest.clearAllMocks());

  it('redirects to the default size', () => {
    render(<RedirectToEditor />);

    expect(route).toHaveBeenCalledWith('/size/8-16/', true);
  });
});
