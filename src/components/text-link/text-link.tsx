import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import { Link } from 'preact-router/match';

import styles from './text-link.css';

interface Props {
  href: string;
  blank?: boolean;
  internal?: boolean;
}

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
    <Comp class={styles.link} href={href} target={target} rel={rel}>
      {children}
    </Comp>
  );
};
