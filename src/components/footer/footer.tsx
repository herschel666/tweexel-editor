import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import classNames from 'classnames';

import { TextLink } from '../text-link/';

const classFooter = classNames('text-sm', 'text-center');

export const Footer: FunctionalComponent = () => (
  <footer class={classFooter}>
    &copy; {new Date().getFullYear()} &middot;{' '}
    <TextLink href="https://twitter.com/Herschel_R" blank={true}>
      Emanuel Kluge
    </TextLink>{' '}
    &middot;{' '}
    <TextLink href="https://github.com/herschel666/tweexel-editor" blank={true}>
      Source
    </TextLink>
    <br />
    Background by{' '}
    <TextLink href="https://www.transparenttextures.com/" blank={true}>
      Transparent Textures
    </TextLink>
  </footer>
);
