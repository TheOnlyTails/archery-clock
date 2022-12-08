import { sveltekit } from "@sveltejs/kit/vite"
import type { UserConfig } from "vite"
import { SvelteKitPWA } from "@vite-pwa/sveltekit"

const config: UserConfig = {
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			mode: "development",
			scope: "/",
			base: "/",
			manifest: {
				name: "Archery Clock",
				short_name: "Archery Clock",
				description: "A minimal archery clock for timing ends.",
				theme_color: "#005fb8",
				background_color: "#F2F2F2",
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
			devOptions: {
				enabled: true,
				type: "module",
				navigateFallback: "/",
			},
		}),
	],
}

export default config
