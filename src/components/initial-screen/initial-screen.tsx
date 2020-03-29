import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';

import { TextLink } from '../text-link/';

const classWelcome = classNames('mx-0', 'my-6');
const classWelcomeContent = classNames(
  'border-gray-400',
  'border-solid',
  'border-t-2',
  'px-0',
  'py-6'
);
const classWelcomeContentCenter = classNames(
  classWelcomeContent,
  'flex',
  'justify-center'
);

export const InitialScreen: FunctionalComponent = ({ children }) => (
  <div class={classWelcome}>
    <div class={classWelcomeContent}>
      <p class="mb-4">
        Welcome to the <strong>tweexel editor</strong>!
      </p>
      <p>
        Choose a canvas size, draw a neat little pixel image, copy the result as
        a string of emojis and then head over to{' '}
        <TextLink href="https://twitter.com/" blank={true}>
          twitter.com
        </TextLink>{' '}
        and tweet your artwork.
      </p>
    </div>
    <div class={classWelcomeContentCenter}>{children}</div>
  </div>
);
