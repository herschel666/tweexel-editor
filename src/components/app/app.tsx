import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import { Router } from 'preact-router';
import classNames from 'classnames';

import { EditorPage } from '../../pages/editor';
import { RedirectToEditor } from '../../pages/redirect-to-editor';
import { NotFoundPage } from '../../pages/not-found';
import { AboutPage } from '../../pages/about';
import { FeedbackProvider } from '../feedback/';
import { Header } from '../header';
import { Footer } from '../footer';

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
const classContent = classNames('flex', 'flex-grow', 'mx-0');

export const App: FunctionalComponent = () => (
  <FeedbackProvider>
    <div class={classMain}>
      <Header />
      <div class={classContent}>
        <Router>
          <RedirectToEditor path="/" />
          <EditorPage path="/size/:size/" />
          <AboutPage path="/about/" />
          <NotFoundPage default={true} />
        </Router>
      </div>
      <Footer />
    </div>
  </FeedbackProvider>
);
