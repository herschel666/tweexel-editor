import { resolve } from 'path';

export default {
  webpack(config, _, helpers) {
    // Use any `index` file, not just index.js
    config.resolve.alias['preact-cli-entrypoint'] = resolve(
      process.cwd(),
      'src',
      'index'
    );

    const [postCssLoader] = helpers.getLoadersByName(config, 'postcss-loader');

    postCssLoader.loader.options.postcssOptions.plugins.unshift(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('tailwindcss')
    );
  },
};
