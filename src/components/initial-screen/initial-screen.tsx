import { FunctionalComponent, h } from 'preact';

export const InitialScreen: FunctionalComponent = ({ children }) => (
  <div class="welcome">
    <div class="welcome__content">
      <p>
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
    <div class="welcome__content welcome__content--center">{children}</div>
  </div>
);
