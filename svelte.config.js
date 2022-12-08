import adapter from "@sveltejs/adapter-auto"
import preprocess from "svelte-preprocess"
import autoprefixer from "autoprefixer"
import cssnano from "cssnano"
import mediaMinmax from "postcss-media-minmax"

/** @type {import("@sveltejs/kit").Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: {
      plugins: [autoprefixer(), cssnano(), mediaMinmax()]
    }
  }),

  kit: {
    adapter: adapter(),
    alias: {
      $util: "src/lib/util"
    }
  }
}

export default config
