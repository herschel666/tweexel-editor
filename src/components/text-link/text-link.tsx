import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import { Link } from 'preact-router/match';
import classNames from 'classnames';

interface Props {
  href: string;
  blank?: boolean;
  internal?: boolean;
}

const classLink = classNames(
  'text-blue-600',
  'hover:text-blue-800',
  'focus:text-blue-800',
  'underline',
  'hover:no-underline',
  'focus:no-underline'
);

export const TextLink: FunctionalComponent<Props> = ({
  href,
  blank = false,
  internal = false,
  children,
}) => {
  const target = blank ? '_blank' : undefined;
  const rel = blank ? 'noreferrer noopener' : undefined;
  const Comp = internal ? Link : 'a';

  return (
    <Comp class={classLink} href={href} target={target} rel={rel}>
      {children}
    </Comp>
  );
};
