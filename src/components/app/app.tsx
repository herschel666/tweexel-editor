import { FunctionalComponent, h } from 'preact';

import { Editor } from '../editor/';

export const App: FunctionalComponent = () => (
  <div class="main">
    <div class="title">
      <h1 class="title__text">tweexel editor</h1>
    </div>
    <div class="app">
      <div class="app__inner">
        <Editor />
      </div>
    </div>
    <footer class="footer">
      &copy; {new Date().getFullYear()} &middot;{' '}
      <a
        href="https://twitter.com/Herschel_R"
        target="_blank"
        rel="noreferrer noopener"
      >
        Emanuel Kluge
      </a>
    </footer>
  </div>
);
