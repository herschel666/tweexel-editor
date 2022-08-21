import type { FunctionalComponent } from 'preact';

export const Headline: FunctionalComponent = ({ children }) => (
  <h1 class="text-gray-700 text-2xl font-bold mb-4">{children}</h1>
);
