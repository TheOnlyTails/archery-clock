/// <reference types="@sveltejs/kit" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />

declare module "*?raw" {
  const src: string
  export default src
}

declare namespace App {
	
}