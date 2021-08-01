import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import styles from './ruler.css';

export const Ruler: FunctionalComponent = () => <hr class={styles.ruler} />;
