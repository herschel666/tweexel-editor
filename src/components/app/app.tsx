import { FunctionalComponent, h } from 'preact';
import Router from 'preact-router';
import classNames from 'classnames';

import { EditorPage } from '../../pages/editor';
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
          <EditorPage path="/" />
          <AboutPage path="/about/" />
        </Router>
      </div>
      <Footer />
    </div>
  </FeedbackProvider>
);
