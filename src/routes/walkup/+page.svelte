<script lang="ts">
	import { onMount } from "svelte"
	import { changeState } from "$lib/clock-state"
	import { walkupLength } from "$lib/settings"
	import { _ } from "svelte-i18n"
	import { page } from "$app/stores"
	import { playBeep, NextButton } from "$lib"
	import type { Snapshot } from "@sveltejs/kit"

	/**
	 * number of seconds during walkup
	 */
	let timer = $walkupLength

	export const snapshot: Snapshot = {
		capture: () => ({
			walkupTimer: timer,
		}),
		restore: (state) => (timer = state.walkupTimer),
	}

	onMount(() => {
		const interval = setInterval(() => timer--, 1000)
		return () => clearInterval(interval)
	})

	$: if (timer <= 0) {
		// move to end
		playBeep()
		changeState($page)
	}
</script>

<main class="walkup">
	<h1>{$_("walkup.title")}</h1>
	<p class="display">{timer}</p>
	<NextButton />
</main>

<style>
	@import "./Walkup.css";
</style>
