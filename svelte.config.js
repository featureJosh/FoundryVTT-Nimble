import { sveltePreprocess } from 'svelte-preprocess';

const config = {
  compilerOptions: {
    runes: true
  },
  preprocess: sveltePreprocess({
    scss: {
      prependData: '@import "src/scss/base/_functions.scss";'
    },
    typescript: {
      tsconfigFile: './tsconfig.json'
    }
  })
};

export default config;
