<script lang="ts">
  import { onMount } from "svelte"
  import { _ } from "svelte-i18n"

  import { changeState, currentEnd, nowShooting } from "$lib/clock-state"
  import { endLength, ends, warningTimeUntilEnd } from "$lib/settings"
  import NextButton from "$lib/util/NextButton.svelte"

  let endTimer = $endLength
  let endDone = false

  onMount(() => {
    setInterval(() => {
      if (!endDone) endTimer--
    }, 1000)
  })

  $: if (endTimer === 0) endDone = true

  const stopClock = (e: KeyboardEvent) => {
    if (
      e.key === "Enter" ||
      e.key === " " ||
      e.key === "Tab" ||
      e.key === "ArrowLeft"
    ) {
      e.preventDefault()
      next()
    }
  }

  const next = () => {
    if (endDone) {
      // next end
      $currentEnd++
      changeState()
    } else {
      endDone = true
      endTimer = 0
    }
  }
</script>

<svelte:window on:keydown={stopClock} />

<main class="end" class:done={endTimer === 0} class:warning={endTimer < $warningTimeUntilEnd}>
  <h1>{$_("end.title", { values: { current: $currentEnd, total: $ends, abcd: $nowShooting } })}</h1>
  <p>{endTimer}</p>
  <NextButton on:click={() => next()} />
</main>

<style lang="scss">
	@use "./End";
</style>