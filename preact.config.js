import { resolve } from 'path';

export default {
  webpack(config) {
    // Use any `index` file, not just index.js
    config.resolve.alias['preact-cli-entrypoint'] = resolve(
      process.cwd(),
      'src',
      'index'
    );
  },
};
