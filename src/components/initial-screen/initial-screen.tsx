import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';

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
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          twitter.com
        </a>{' '}
        and tweet your artwork.
      </p>
    </div>
    <div class={classWelcomeContentCenter}>{children}</div>
  </div>
);
