<script lang="ts">
	import { beepAudio, playBeep } from "$lib"
	import { onMount } from "svelte"
	import { _ } from "svelte-i18n"
	import { pwaInfo } from "virtual:pwa-info"

	import { currentEnd, currentScreen, isStartingEnd } from "$lib/clock-state"

	import "fluent-svelte/theme.css"
	import "../global.css"

	export const snapshot = {
		capture: () => ({
			$currentScreen,
			$currentEnd,
			$isStartingEnd,
		}),
		restore: (state) => {
			$currentScreen = state.$currentScreen
			$currentEnd = state.$currentEnd
			$isStartingEnd = state.$isStartingEnd
		},
	}

	const handleKeys = (e: KeyboardEvent) => {
		if ($currentScreen !== "green" && e.key === " ") {
			e.preventDefault()

			if ($currentScreen === "idle") {
				// going to walkup
				playBeep(2)
				$currentScreen = "red"
			} else if ($currentScreen === "red") {
				// starting an end
				playBeep()
				$currentScreen = "green"
			}
		}
	}

	onMount(async () => {
		beepAudio.beep = new Audio("/beep.wav")

		if (pwaInfo) {
			const { registerSW } = await import("virtual:pwa-register")
			registerSW({
				immediate: true,
				onRegistered(r) {
					// uncomment following code if you want check for updates
					r &&
						setInterval(() => {
							console.debug("Checking for sw update")
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
