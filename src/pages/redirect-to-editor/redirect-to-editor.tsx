import { useEffect } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import { route } from 'preact-router';

import { getCurrentSize } from '../../helpers';

export const RedirectToEditor: FunctionalComponent = () => {
  useEffect(() => {
    route(`/size/${getCurrentSize().join('-')}/`, true);
  }, []);

  return null;
};
