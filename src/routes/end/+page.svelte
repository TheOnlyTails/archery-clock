<script lang="ts">
	import { onMount } from "svelte"
	import { _ } from "svelte-i18n"
	import { page } from "$app/stores"

	import { changeState, currentEnd, isStartingEnd, nowShooting } from "$lib/clock-state"
	import { endLength, ends, firingRotationType, warningTimeUntilEnd } from "$lib/settings"
	import { NextButton, playBeep } from "$lib"
	import { Button, TextBlock } from "fluent-svelte"

	import Pause from "@fluentui/svg-icons/icons/warning_16_regular.svg?raw"
	import { goto } from "$app/navigation"

	let endTimer = $endLength
	let paused = false

	$: if (endTimer === 0) next()

	onMount(() => {
		setInterval(() => {
			// count down until 0 while the timer isn't paused
			if (endTimer !== 0 && !paused) endTimer--
		}, 1000)
	})

	const stopClock = async (e: KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " " || e.key === "Tab") {
			e.preventDefault()
			// manually skip to the next part
			next()
		}
	}

	const next = () => {
		// if the timer is paused, unpause it
		if (paused) {
			paused = false
			return
		}

		// increase the end counter
		const goToIdle = async () => {
			$isStartingEnd = true
			$currentEnd++
			playBeep(3)
			changeState($page)
		}

		const goToWalkup = () => {
			$isStartingEnd = false
			playBeep(2)
			goto("/walkup")
		}

		if ($firingRotationType === "ABCD") {
			// if the end is in its first part, go to walkup
			// if it's not, go to idle
			if ($isStartingEnd) goToWalkup()
			else goToIdle()
		} else goToIdle() // if the rotation type is AB, we can skip straight ahead
	}

	const stop = () => {
		paused = !paused
		if (paused) playBeep(5)
	}
</script>

<svelte:window on:keydown={stopClock} />

<main class="end" class:paused class:warning={endTimer <= $warningTimeUntilEnd}>
	<h1>{$_("end.title", { values: { current: $currentEnd, total: $ends, abcd: $nowShooting } })}</h1>
	<p class="end-display">{!paused ? endTimer : "STOP"}</p>
	<TextBlock variant="subtitle">Press space to continue</TextBlock>
	<div class="buttons">
		<NextButton on:click={next} />
		{#if endTimer !== 0}
			<Button class="stop-button {paused ? 'paused' : ''}" on:click={stop}>
				{@html Pause}
				{#if !paused}
					{$_("stop_button.pause")}
				{:else}
					{$_("stop_button.continue")}
				{/if}
			</Button>
		{/if}
	</div>
</main>

<style lang="scss">
	@use "src/styles/pages/End";
</style>
