import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import classNames from 'classnames';

import styles from './button.css';

interface Props {
  onClick: (evnt: Event) => void;
  classes?: string;
  disabled?: boolean;
}

export const Button: FunctionalComponent<Props> = ({
  onClick,
  classes,
  disabled = false,
  children,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    class={classNames(styles.button, classes)}
  >
    {children}
  </button>
);
