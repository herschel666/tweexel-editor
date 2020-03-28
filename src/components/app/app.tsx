import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';

import { Editor } from '../editor/';
import { TextLink } from '../text-link/';
import { FeedbackProvider } from '../feedback/';
import { titleText } from './app.css';

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
  'text-gray-700'
);
const classTitle = classNames('flex', 'justify-center');
const classTitleText = classNames(
  'text-4xl',
  'text-center',
  'tracking-widest',
  titleText
);
const classApp = classNames('flex', 'flex-grow');
const classAppInner = classNames('w-full');
const classFooter = classNames('text-sm', 'text-center');

export const App: FunctionalComponent = () => (
  <FeedbackProvider>
    <div class={classMain}>
      <div class={classTitle}>
        <h1 class={classTitleText}>tweexel editor</h1>
      </div>
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
      </footer>
    </div>
  </FeedbackProvider>
);
