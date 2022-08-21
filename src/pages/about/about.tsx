import type { FunctionalComponent } from 'preact';

import { Ruler } from '../../components/ruler';
import { Paragraph } from '../../components/paragraph';
import { TextLink } from '../../components/text-link/';

export const AboutPage: FunctionalComponent = () => (
  <div>
    <Paragraph>
      Twitter has 9 colored square emojis, that you can use to create tweetable
      pixel art.
    </Paragraph>
    <Paragraph>
      But since copying &amp; pasting those emojis in the Twitter editor is no
      fun at all, <strong>tweexel</strong> offers a neat editor, that you can
      use to draw beautiful pixel artworks.
    </Paragraph>
    <Paragraph>
      And when your masterpiece is done, click the &ldquo;Copy
      artwork&rdquo;-button, head over to{' '}
      <TextLink href="https://twitter.com/" blank={true}>
        twitter.com
      </TextLink>{' '}
      and share it with the world in a tweet. 🐦
    </Paragraph>
    <Ruler />
    <Paragraph base={true}>
      If there is something wrong or not working as expected, drop me a line on{' '}
      <TextLink href="https://twitter.com/herschel_r" blank={true}>
        Twitter
      </TextLink>{' '}
      or open an issue on{' '}
      <TextLink
        href="https://github.com/herschel666/tweexel-editor/issues"
        blank={true}
      >
        Github
      </TextLink>
      .
    </Paragraph>
  </div>
);
