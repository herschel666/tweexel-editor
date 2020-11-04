import { h, Component } from 'preact';
import type { JSX } from 'preact';
import { Router } from 'preact-router';
import type { RouterOnChangeArgs } from 'preact-router';
import classNames from 'classnames';

import { EditorPage } from '../../pages/editor';
import { RedirectToEditor } from '../../pages/redirect-to-editor';
import { NotFoundPage } from '../../pages/not-found';
import { AboutPage } from '../../pages/about';
import { FeedbackProvider } from '../feedback/';
import { Header } from '../header';
import { Footer } from '../footer';

const TRACKING_PIXEL = 'https://analytics.e5l.de/cctv.gif';
const TRACKING_ID =
  'ff2bd199d3087d15dc9eef0b39947b0134f56fb97f80228606543eb7e456216b_ff606f0941ad6aab6e50abe4914df80a';

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
              <EditorPage path="/size/:size/" />
              <AboutPage path="/about/" />
              <NotFoundPage default={true} />
            </Router>
          </div>
          <Footer />
        </div>
      </FeedbackProvider>
    );
  }
}
