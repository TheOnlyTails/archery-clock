<script lang="ts">
  import { onMount } from "svelte"
  import { _ } from "svelte-i18n"

  import { changeState, currentEnd, isStartingEnd, nowShooting, state } from "$lib/clock-state"
  import { endLength, ends, firingRotationType, warningTimeUntilEnd } from "$lib/settings"
  import { NextButton, beepAudio } from "$lib"
  import { Button } from "fluent-svelte"
  import Pause from "@fluentui/svg-icons/icons/pause_16_regular.svg?raw"

  let endTimer = $endLength
  $: endDone = endTimer === 0
  $: if (endDone) beepAudio.playBeep(3)

  let paused = false

  onMount(() => {
    setInterval(() => {
      if (!endDone && !paused) endTimer--
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
    if (paused) {
      paused = false
      return
    }

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
    }
  }

  const stop = async () => {
    paused = !paused
    if (paused) await beepAudio.playBeep(5)
  }
</script>

<svelte:window on:keydown={stopClock} />

<main class="end" class:paused class:done={endTimer === 0} class:warning={endTimer <= $warningTimeUntilEnd}>
  <h1>{$_("end.title", { values: { current: $currentEnd, total: $ends, abcd: $nowShooting } })}</h1>
  <p>{!paused ? endTimer : "STOP"}</p>
  <div class="buttons">
    <NextButton on:click={next} />
    {#if !endDone}
      <Button class="stop-button {paused ? 'paused' : ''}" on:click={stop}>
        {@html Pause}
        {$_(`stop_button.${!paused ? "pause" : "continue"}`)}
      </Button>
    {/if}
  </div>
</main>

<style lang="scss">
	@use "./End";
</style>