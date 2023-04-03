<script lang="ts">
	import { playBeep } from "$lib"
	import { currentScreen } from "$lib/clock-state"
	import { walkupLength } from "$lib/settings"
	import { onMount } from "svelte"

	/**
	 * number of seconds during walkup
	 */
	let timer = $walkupLength

	onMount(() => {
		const interval = setInterval(() => timer--, 1000)
		return () => clearInterval(interval)
	})

	$: if (timer <= 0) {
		// move to end
		playBeep()
		$currentScreen = "green"
	}
</script>

<main class="red">
	<p class="display">{timer}</p>
</main>

<style>
	@import "./Red.css";
</style>
