import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';

interface Props {
  onClick: (evnt: Event) => void;
  classes?: string;
  disabled?: boolean;
}

const classButton = classNames(
  'px-3',
  'py-2',
  'bg-blue-600',
  'hover:bg-blue-800',
  'focus:bg-blue-800',
  'text-sm',
  'text-white',
  'rounded'
);

export const Button: FunctionalComponent<Props> = ({
  onClick,
  classes,
  disabled = false,
  children,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    class={classNames(classButton, classes)}
  >
    {children}
  </button>
);
