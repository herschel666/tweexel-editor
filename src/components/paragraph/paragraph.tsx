import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import classNames from 'classnames';

interface Props {
  base?: boolean;
}

export const Paragraph: FunctionalComponent<Props> = ({ base, children }) => (
  <p
    class={classNames('mb-4', {
      'text-base': base,
    })}
  >
    {children}
  </p>
);
