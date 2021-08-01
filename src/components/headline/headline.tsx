import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import styles from './headline.css';

export const Headline: FunctionalComponent = ({ children }) => (
  <h1 class={styles.headline}>{children}</h1>
);
