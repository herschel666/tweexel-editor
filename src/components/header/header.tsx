import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import { Link } from 'preact-router/match';

import styles from './header.css';

export const Header: FunctionalComponent = () => (
  <header class={styles.header}>
    <h1 class={styles.title}>tweexel</h1>
    <span class={styles.subtitle}>
      Create tweet-sized, emoji-based Pixel Art.
    </span>
    <nav class={styles.nav}>
      <Link
        class={styles.link}
        activeClassName={styles.linkActive}
        href="/"
        path="/size/:size/"
      >
        Editor
      </Link>
      <Link
        class={styles.link}
        activeClassName={styles.linkActive}
        href="/about/"
      >
        About
      </Link>
    </nav>
  </header>
);
