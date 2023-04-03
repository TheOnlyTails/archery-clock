<script lang="ts">
	import { currentScreen } from "$lib/clock-state"
	import { onMount } from "svelte"
	import { fly } from "svelte/transition"
	import type { Snapshot } from "./$types"
	import Green from "./Green.svelte"
	import Idle from "./Idle.svelte"
	import Red from "./Red.svelte"

	export const snapshot: Snapshot = {
		capture: () => ({
			$currentScreen,
			loaded,
		}),
		restore: (state) => {
			$currentScreen = state.$currentScreen
			loaded = loaded
		},
	}

	let loaded = false
	onMount(() => {
		loaded = true
	})
</script>

{#if loaded}
	<div style:display="contents" in:fly={{ y: -6, duration: 400 }}>
		{#if $currentScreen === "idle"}
			<Idle />
		{:else if $currentScreen === "red"}
			<Red />
		{:else if $currentScreen === "green"}
			<Green />
		{/if}
	</div>
{/if}
