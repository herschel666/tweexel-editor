import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import classNames from 'classnames';

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
    class={classNames(
      'px-3',
      'py-2',
      'bg-blue-600',
      'hover:bg-blue-800',
      'focus:bg-blue-800',
      'text-sm',
      'text-white',
      'rounded',
      classes
    )}
  >
    {children}
  </button>
);
