<script lang="ts">
	import { onMount } from "svelte"
	import { _ } from "svelte-i18n"

	import { NextButton, playBeep } from "$lib"
	import { currentEnd, currentScreen, isStartingEnd, nowShooting } from "$lib/clock-state"
	import { endLength, ends, firingRotationType, warningTimeUntilEnd } from "$lib/settings"
	import { Button, TextBlock } from "fluent-svelte"

	import Warning from "@fluentui/svg-icons/icons/warning_16_regular.svg?raw"
	import Checkmark from "@fluentui/svg-icons/icons/checkmark_16_regular.svg?raw"

	let timer = $endLength
	let paused = false

	$: if (timer === 0) next()

	onMount(() => {
		const interval = setInterval(() => {
			// count down until 0 while the timer isn't paused
			if (timer !== 0 && !paused) timer--
		}, 1000)
		return () => clearInterval(interval)
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
			$currentScreen = "idle"
		}

		const goToWalkup = () => {
			$isStartingEnd = false
			playBeep(2)
			$currentScreen = "red"
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

<main class="green" class:paused class:warning={timer <= $warningTimeUntilEnd}>
	<h1 class="title">
		{$_("green.title", { values: { current: $currentEnd, total: $ends, abcd: $nowShooting } })}
	</h1>
	<p class="display">{!paused ? timer : "STOP"}</p>
	<TextBlock class="description" variant="subtitle">Press space to continue</TextBlock>

	<div class="buttons">
		<NextButton on:click={next} />
		{#if timer !== 0}
			<Button class="danger-button {paused ? 'paused' : ''}" on:click={stop}>
				{@html paused ? Checkmark : Warning}
				{#if !paused}
					{$_("stop_button.pause")}
				{:else}
					{$_("stop_button.continue")}
				{/if}
			</Button>
		{/if}
	</div>
</main>

<style>
	@import "./Green.css";
</style>
