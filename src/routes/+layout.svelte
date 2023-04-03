<script lang="ts">
	import { onMount } from "svelte"
	import { playBeep } from "$lib"
	import { changeState } from "$lib/clock-state"
	import { page } from "$app/stores"
	import { _ } from "svelte-i18n"
	import { pwaInfo } from "virtual:pwa-info"

	import "fluent-svelte/theme.css"
	import "../styles/global.css"

	const handleKeys = (e: KeyboardEvent) => {
		if ($page.route.id !== "/end" && (e.key === "Enter" || e.key === " " || e.key === "Tab")) {
			e.preventDefault()

			if ($page.route.id === "/") {
				// going to walkup
				playBeep(2)
			} else if ($page.route.id === "/walkup") {
				// starting an end
				playBeep()
			}

			changeState($page)
		}
	}

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import("virtual:pwa-register")
			registerSW({
				immediate: true,
				onRegistered(r) {
					// uncomment following code if you want check for updates
					r &&
						setInterval(() => {
							console.log("Checking for sw update")
							r.update()
						}, 20000 /* 20s for testing purposes */)
					console.log(`SW Registered: ${r}`)
				},
				onRegisterError(error) {
					console.log("SW registration error", error)
				},
			})
		}
	})

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ""
</script>

<svelte:window on:keydown={handleKeys} />

<svelte:head>
	<title>{$_("title")}</title>
	<meta content={$_("title")} name="title" />
	<meta content={$_("title")} name="og:title" />
	{@html webManifest}
</svelte:head>

<slot />
