import { h, Component } from 'preact';
import type { JSX } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import type { RouterOnChangeArgs } from 'preact-router';
import classNames from 'classnames';

import { RedirectToEditor } from '../../pages/redirect-to-editor';
import { NotFoundPage } from '../../pages/not-found';
import { FeedbackProvider } from '../feedback/';
import { Header } from '../header';
import { Footer } from '../footer';

const TRACKING_PIXEL = 'https://analytics.e5l.de/cctv.gif';
const TRACKING_ID =
  'c37acc3f34a4b67e4f2b75a86f3cbeb4c1165722c4c53a23ca2ee483821cd1c6_eb4a44fa4d66ac416849da2026ffbf8b';

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

export class App extends Component {
  track(pathname: string): void {
    const { hostname } = location;
    const resource = encodeURIComponent(pathname);
    const referrer = encodeURIComponent(document.referrer);
    const src = `${TRACKING_PIXEL}?id=${TRACKING_ID}&resource=${resource}&referrer=${referrer}`;
    if (hostname === 'localhost') {
      console.log('TRACKING "%s" refferred by "%s"', resource, referrer);
    } else {
      Object.assign(new Image(), { src });
    }
  }

  handleRouteChange = ({ url, previous }: RouterOnChangeArgs): void => {
    if (typeof document !== 'undefined' && url !== previous && url !== '/') {
      this.track(url);
    }
  };

  render(): JSX.Element {
    return (
      <FeedbackProvider>
        <div class={classMain}>
          <Header />
          <div class={classContent}>
            <Router onChange={this.handleRouteChange}>
              <RedirectToEditor path="/" />
              <AsyncRoute
                path="/size/:size/"
                getComponent={() =>
                  import('../../pages/editor').then(
                    ({ EditorPage }) => EditorPage
                  )
                }
              />
              <AsyncRoute
                path="/about/"
                getComponent={() =>
                  import('../../pages/about').then(({ AboutPage }) => AboutPage)
                }
              />
              <NotFoundPage default={true} />
            </Router>
          </div>
          <Footer />
        </div>
      </FeedbackProvider>
    );
  }
}
