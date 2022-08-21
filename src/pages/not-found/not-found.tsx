import type { FunctionalComponent } from 'preact';

import { TextLink } from '../../components/text-link';
import { Headline } from '../../components/headline';
import { Paragraph } from '../../components/paragraph';

export const NotFoundPage: FunctionalComponent = () => (
  <div>
    <Headline>Oh noes&hellip;!! This page does not exist.</Headline>
    <Paragraph>
      Try going back to the{' '}
      <TextLink href="/" internal={true}>
        start page
      </TextLink>
      .
    </Paragraph>
  </div>
);
