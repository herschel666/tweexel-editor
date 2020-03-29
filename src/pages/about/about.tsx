import { FunctionalComponent, h } from 'preact';

import { TextLink } from '../../components/text-link/';

export const AboutPage: FunctionalComponent = () => (
  <div>
    <p class="mb-4">
      Twitter has 9 colored square emojis, that you can use to create tweetable
      pixel art.
    </p>
    <p class="mb-4">
      But since copying &amp; pasting those emojis in the Twitter editor is no
      fun at all, <strong>tweexel</strong> offers a neat editor, that you can
      use to draw beautiful pixel artworks.
    </p>
    <p class="mb-4">
      And when your masterpiece is done, click the &ldquo;Copy
      artwork&rdquo;-button, head over to{' '}
      <TextLink href="https://twitter.com/" blank={true}>
        twitter.com
      </TextLink>{' '}
      and share it with the world in a tweet. 🐦
    </p>
    <hr />
    <p class="my-4 text-base">
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
    </p>
  </div>
);
