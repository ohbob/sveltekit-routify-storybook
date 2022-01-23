import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-auto'
import path from 'path'
import routify from '@roxi/routify/vite-plugin'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      plugins: [routify({ routesDir: 'src/pages' })],
      resolve: {
        dedupe: ['svelte'],
        alias: {
          $lib: path.resolve('./src/lib'),
          $components: path.resolve('./src/lib/components'),
        },
      },
    },
    router: false,
  },

  preprocess: [preprocess({})],
}

export default config
