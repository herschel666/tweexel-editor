import type { FunctionalComponent } from 'preact';

import { TextLink } from '../text-link/';

export const Footer: FunctionalComponent = () => (
  <footer class="text-sm text-center">
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
