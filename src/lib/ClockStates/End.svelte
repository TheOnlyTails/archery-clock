<script lang="ts">
  import { onMount } from "svelte"
  import { _ } from "svelte-i18n"

  import { changeState, currentEnd, isStartingEnd, nowShooting, state } from "$lib/clock-state"
  import { endLength, ends, firingRotationType, warningTimeUntilEnd } from "$lib/settings"
  import { NextButton, beepAudio } from "$lib"
  import { Button, TextBlock } from "fluent-svelte"
  import Pause from "@fluentui/svg-icons/icons/warning_16_regular.svg?raw"

  let endTimer = $endLength
  let paused = false

  $: if (endTimer === 0) (async () => await next())()

  onMount(() => {
    setInterval(() => {
      // count down until 0 while the timer isn't paused
      if (endTimer !== 0 && !paused) endTimer--
    }, 1000)
  })

  const stopClock = async (e: KeyboardEvent) => {
    if (
      e.key === "Enter" ||
      e.key === " " ||
      e.key === "Tab"
    ) {
      e.preventDefault()
      // manually skip to the next part
      await next()
    }
  }

  const next = async () => {
    // if the timer is paused, unpause it
    if (paused) {
      paused = false
      return
    }

    // increase the end counter
    const goToIdle = async () => {
      $isStartingEnd = true
      $currentEnd++
      await beepAudio.playBeep(3)
      changeState()
    }

    const goToWalkup = async () => {
      $isStartingEnd = false
      await beepAudio.playBeep(2)
      $state = "walkup"
    }

    if ($firingRotationType === "ABCD") {
      if ($isStartingEnd) {
        // if the end is in its first part, go to walkup
        await goToWalkup()
      } else {
        // if it's not, go to idle
        await goToIdle()
      }
    } else {
      // if the rotation type is AB, we can skip straight ahead
      await goToIdle()
    }
  }

  const stop = async () => {
    paused = !paused
    if (paused) await beepAudio.playBeep(5)
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
        {$_(`stop_button.${!paused ? "pause" : "continue"}`)}
      </Button>
    {/if}
  </div>
</main>

<style lang="scss">
	@use "./End";
</style>