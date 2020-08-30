import { Component } from 'preact';
import type { ComponentChild } from 'preact';
import { route } from 'preact-router';

import { getCurrentSize } from '../../helpers';

export class RedirectToEditor extends Component {
  componentDidMount(): void {
    route(`/size/${getCurrentSize().join('-')}/`);
  }

  render(): ComponentChild {
    return null;
  }
}
