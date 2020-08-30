import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import { Link } from 'preact-router/match';
import classNames from 'classnames';

import { title } from './header.css';

const classHeader = classNames(
  'flex',
  'flex-col',
  'mb-6',
  'text-center',
  'border-gray-400',
  'border-solid',
  'border-b-2'
);
const classTitle = classNames('text-4xl', 'tracking-widest', title);
const classNav = classNames('flex', 'flex-row', 'justify-center', 'mt-4');
const classLink = classNames(
  'py-2',
  'mx-4',
  'hover:text-blue-600',
  'focus:text-blue-600',
  'border-b-4',
  'border-solid',
  'border-white'
);
const classLinkActive = classNames('text-blue-600', 'border-blue-600');

export const Header: FunctionalComponent = () => (
  <header class={classHeader}>
    <h1 class={classTitle}>tweexel</h1>
    <span class="text-base">Create tweet-sized, emoji-based Pixel Art.</span>
    <nav class={classNav}>
      <Link
        class={classLink}
        activeClassName={classLinkActive}
        href="/"
        path="/size/:size/"
      >
        Editor
      </Link>
      <Link class={classLink} activeClassName={classLinkActive} href="/about/">
        About
      </Link>
    </nav>
  </header>
);
