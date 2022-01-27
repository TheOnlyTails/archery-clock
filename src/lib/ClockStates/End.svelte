<script lang="ts">
  import { onMount } from "svelte"
  import { _ } from "svelte-i18n"

  import { changeState, currentEnd, isStartingEnd, nowShooting } from "$lib/clock-state"
  import { endLength, ends, firingRotationType, warningTimeUntilEnd } from "$lib/settings"
  import { NextButton, playBeep } from "$lib"

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
      // if the clock is in ABCD mode and the end is starting, the clock will wait to the end before moving on
      if ($firingRotationType === "AB" || !$isStartingEnd) $currentEnd++

      $isStartingEnd = !$isStartingEnd

      changeState()
    } else if (endTimer > $warningTimeUntilEnd) {
      endTimer = $warningTimeUntilEnd
    } else {
      endTimer = 0
      await playBeep(3)
    }
  }
</script>

<svelte:window on:keydown={stopClock} />

<main class="end" class:done={endTimer === 0} class:warning={endTimer <= $warningTimeUntilEnd}>
  <h1>{$_("end.title", { values: { current: $currentEnd, total: $ends, abcd: $nowShooting } })}</h1>
  <p>{endTimer}</p>
  <NextButton on:click={() => next()} />
</main>

<style lang="scss">
	@use "./End";
</style>