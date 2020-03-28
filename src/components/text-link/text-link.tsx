import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';

interface Props {
  href: string;
  blank?: boolean;
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
  children,
}) => {
  const target = blank ? '_blank' : undefined;
  const rel = blank ? 'noreferrer noopener' : undefined;

  return (
    <a class={classLink} href={href} target={target} rel={rel}>
      {children}
    </a>
  );
};
