import { sveltekit } from "@sveltejs/kit/vite"
import type { UserConfig } from "vite"
import { SvelteKitPWA } from "@vite-pwa/sveltekit"
import lightningcss from "vite-plugin-lightningcss"

const config: UserConfig = {
	plugins: [
		sveltekit(),
		lightningcss({
			minify: true,
			browserslist: "last 2 versions, >= 0.25%, not dead",
			drafts: {
				customMedia: true,
				nesting: true,
			},
		}),
		SvelteKitPWA({
			strategies: "generateSW",
			srcDir: "./src",
			manifest: {
				name: "Archery Clock",
				short_name: "Archery Clock",
				description: "A minimal archery clock for timing ends.",
				theme_color: "#60cbfd",
				background_color: "#f2f2f2",
				start_url: "/",
				scope: "/",
				display: "fullscreen",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
			injectManifest: {
				globPatterns: ["client/**/*.{js,css,ico,png,svg,webp,woff,woff2}"],
			},
			workbox: {
				globPatterns: ["client/**/*.{js,css,ico,png,svg,webp,woff,woff2}"],
			},
			devOptions: {
				enabled: true,
				type: "module",
			},
		}),
	],
}

export default config
