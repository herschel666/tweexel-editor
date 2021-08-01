import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import classNames from 'classnames';

import styles from './paragraph.css';

interface Props {
  base?: boolean;
}

export const Paragraph: FunctionalComponent<Props> = ({ base, children }) => (
  <p
    class={classNames(styles.paragraph, {
      [styles.base]: base,
    })}
  >
    {children}
  </p>
);
