<script lang="ts">
	import { onMount } from "svelte"
	import { _ } from "svelte-i18n"

	import { changeState, currentEnd, isStartingEnd, nowShooting, state } from "$lib/clock-state"
	import { endLength, ends, firingRotationType, warningTimeUntilEnd } from "$lib/settings"
	import { NextButton, beepAudio } from "$lib"

	let endTimer = $endLength
	$: endDone = endTimer === 0

	onMount(() => {
		setInterval(() => {
			if (!endDone) endTimer--
		}, 1000)
	})


	const stopClock = async (e: KeyboardEvent) => {
		if (
				e.key === "Enter" ||
				e.key === " " ||
				e.key === "Tab" ||
				e.key === "ArrowLeft"
		) {
			e.preventDefault()
			await next()
		}
	}

	const next = async () => {
		if (endDone) {
			const currentIsStartingEnd = $isStartingEnd

			$isStartingEnd = !$isStartingEnd

			// if the clock is in ABCD mode and the end is starting, the clock will wait to the end before moving on
			if ($firingRotationType === "AB" || !currentIsStartingEnd) $currentEnd++

			// if the rotation type is AB, or the end is ending, move on to the idle state
			if ($firingRotationType === "AB" || !currentIsStartingEnd) changeState()
			// if it's ABCD and starting an end, go straight to walkup
			else {
				await beepAudio.playBeep(2)
				$state = "walkup"
			}
		} else if (endTimer > $warningTimeUntilEnd) {
			endTimer = $warningTimeUntilEnd
		} else {
			endTimer = 0
			await beepAudio.playBeep(3)
		}
	}
</script>

<svelte:window on:keydown={stopClock}/>

<main class="end" class:done={endTimer === 0} class:warning={endTimer <= $warningTimeUntilEnd}>
	<h1>{$_("end.title", {values: {current: $currentEnd, total: $ends, abcd: $nowShooting}})}</h1>
	<p>{endTimer}</p>
	<NextButton on:click={() => next()}/>
</main>

<style lang="scss">
	@use "./End";
</style>