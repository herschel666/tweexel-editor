import { describe, beforeAll, afterAll, it, expect, vi } from 'vitest';
import { h } from 'preact';
import * as preactRouter from 'preact-router';
import { render } from '@testing-library/preact';

import { STORAGE_KEY_SIZE } from '../../constants';
import { RedirectToEditor } from '.';

vi.mock('preact-router', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require('preact-router');
  const route = vi.fn();
  return {
    ...pkg,
    route,
  };
});

afterAll(() => {
  vi.clearAllMocks();
});

describe('redirecting to the default size', () => {
  it('redirects to the default size', () => {
    render(<RedirectToEditor />);

    expect(preactRouter.route).toHaveBeenCalledWith('/size/16-8/', true);
  });
});

describe('redirecting to the stored size', () => {
  beforeAll(() => {
    sessionStorage[STORAGE_KEY_SIZE] = '[8, 16]';
  });

  it('redirects to the default size', () => {
    render(<RedirectToEditor />);

    expect(preactRouter.route).toHaveBeenCalledWith('/size/8-16/', true);
  });
});
