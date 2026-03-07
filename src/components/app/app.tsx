import type { FunctionalComponent } from 'preact';
import { Router } from 'preact-router';

import { EditorPage } from '../../pages/editor';
import { AboutPage } from '../../pages/about';
import { RedirectToEditor } from '../../pages/redirect-to-editor';
import { NotFoundPage } from '../../pages/not-found';
import { FeedbackProvider } from '../feedback/';
import { Header } from '../header';
import { Footer } from '../footer';

export const App: FunctionalComponent = () => {
  return (
    <FeedbackProvider>
      <div class="flex flex-col box-border w-full max-w-md min-h-screen px-3 py-6 mx-auto my-0 font-serif text-lg leading-normal text-gray-700 bg-white shadow">
        <Header />
        <div class="flex flex-grow mx-0">
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
};
