import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import classNames from 'classnames';

import { TextLink } from '../../components/text-link';

const classHeadline = classNames(
  'text-gray-700',
  'text-2xl',
  'font-bold',
  'mb-4'
);

export const NotFoundPage: FunctionalComponent = () => (
  <div>
    <h1 className={classHeadline}>
      Oh noes&hellip;!! This page does not exist.
    </h1>
    <p class="mb-4">
      Try going back to the{' '}
      <TextLink href="/" internal={true}>
        start page
      </TextLink>
      .
    </p>
  </div>
);
