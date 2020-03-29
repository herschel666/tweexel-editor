import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';

import { Editor } from '../editor/';
import { TextLink } from '../text-link/';
import { FeedbackProvider } from '../feedback/';
import { title } from './app.css';

const classMain = classNames(
  'flex',
  'flex-col',
  'box-border',
  'w-full',
  'max-w-md',
  'min-h-screen',
  'px-3',
  'py-6',
  'mx-auto',
  'my-0',
  'font-serif',
  'text-lg',
  'leading-normal',
  'text-gray-700',
  'bg-white',
  'shadow'
);
const classHeader = classNames('flex', 'flex-col', 'text-center');
const classTitle = classNames('text-4xl', 'tracking-widest', title);
const classApp = classNames('flex', 'flex-grow');
const classAppInner = classNames('w-full');
const classFooter = classNames('text-sm', 'text-center');

export const App: FunctionalComponent = () => (
  <FeedbackProvider>
    <div class={classMain}>
      <header class={classHeader}>
        <h1 class={classTitle}>tweexel</h1>
        <span>Create tweet-sized, emoji-based Pixel Art.</span>
      </header>
      <div class={classApp}>
        <div class={classAppInner}>
          <Editor />
        </div>
      </div>
      <footer class={classFooter}>
        &copy; {new Date().getFullYear()} &middot;{' '}
        <TextLink href="https://twitter.com/Herschel_R" blank={true}>
          Emanuel Kluge
        </TextLink>{' '}
        &middot;{' '}
        <TextLink
          href="https://github.com/herschel666/tweexel-editor"
          blank={true}
        >
          Source
        </TextLink>
        <br />
        Background by{' '}
        <TextLink href="https://www.transparenttextures.com/" blank={true}>
          Transparent Textures
        </TextLink>
      </footer>
    </div>
  </FeedbackProvider>
);
