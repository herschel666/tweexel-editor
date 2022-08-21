import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import { Link } from 'preact-router/match';
import classNames from 'classnames';

import styles from './header.css';

export const Header: FunctionalComponent = () => {
  const linkClass =
    'py-2 mx-4 hover:text-blue-600 focus:text-blue-600 border-b-4 border-solid border-white';
  const linkActiveClass = 'text-blue-600 border-blue-600';

  return (
    <header class="flex flex-col mb-6 text-center border-gray-400 border-solid border-b-2">
      <h1 class={classNames('text-4xl', 'tracking-widest', styles.title)}>
        tweexel
      </h1>
      <span class="text-base">Create tweet-sized, emoji-based Pixel Art.</span>
      <nav class="flex flex-row justify-center mt-4">
        <Link
          class={linkClass}
          activeClassName={linkActiveClass}
          href="/"
          path="/size/:size/"
        >
          Editor
        </Link>
        <Link
          class={linkClass}
          activeClassName={linkActiveClass}
          href="/about/"
        >
          About
        </Link>
      </nav>
    </header>
  );
};
