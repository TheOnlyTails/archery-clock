<!--suppress XmlInvalidId -->
<script lang="ts">
  import { onMount } from "svelte"
  import { fly } from "svelte/transition"
  import { _ } from "svelte-i18n"
  import { currentEnd, isStartingEnd } from "$lib/clock-state"
  import { endLength, ends, firingRotationType, walkupLength, warningTimeUntilEnd } from "$lib/settings"
  import { Info, NextButton } from "$lib"

  import { Button, ComboBox, ContentDialog, NumberBox } from "fluent-svelte"
  import Settings from "@fluentui/svg-icons/icons/settings_16_regular.svg?raw"
  import Reset from "@fluentui/svg-icons/icons/arrow_counterclockwise_16_regular.svg?raw"

  let loaded = false

  let settingsDialogOpen = false

  const resetClock = () => {
    $isStartingEnd = true
    currentEnd.setToDefault()
  }

  onMount(() => {
    loaded = true
  })
</script>

{#if loaded}
  <main class="idle" in:fly={{ y: -6, duration: 400 }}>
    <h1>{$_("title")}</h1>
    <p>{$_("press_to_begin")}</p>

    <div class="buttons">
      <Button class="settings-button" on:click={() => settingsDialogOpen = true}>
        {@html Settings} {$_("settings.button")}
      </Button>
      <NextButton />
      {#if $currentEnd > 1 || !$isStartingEnd}
        <Button class="reset-button" on:click={resetClock}>
          {@html Reset} {$_("reset_button")}
        </Button>
      {/if}
    </div>

    <ContentDialog bind:open={settingsDialogOpen} title={$_("settings.title")} class="settings-dialog">
      <div class="settings">
        <label for="setting-ends">{
          $_("settings.ends_per_round", { values: { default: ends.defaultValue } })
        }</label>
        <NumberBox id="setting-ends" bind:value={$ends} min={1} max={50} inline />

        <label for="setting-firing-rotation">{
          $_("settings.firing_rotation", { values: { default: firingRotationType.defaultValue } })
        }</label>
        <ComboBox id="setting-firing-rotation" items={[{name: "AB"},{name: "ABCD"}]} bind:value={$firingRotationType} />

        <label for="setting-end-length">{
          $_("settings.end_length", { values: { default: endLength.defaultValue } })
        }</label>
        <NumberBox id="setting-end-length" bind:value={$endLength} min={10} max={3600} inline />

        <label for="setting-walkup-length">{
          $_("settings.walkup_length", { values: { default: walkupLength.defaultValue } })
        }</label>
        <NumberBox id="setting-walkup-length" bind:value={$walkupLength} min={10} max={300} inline />

        <label for="setting-warning-time">{
          $_("settings.warning_time", { values: { default: warningTimeUntilEnd.defaultValue } })
        }</label>
        <NumberBox id="setting-warning-time" bind:value={$warningTimeUntilEnd} min={10} max={300} inline />
      </div>
      <Button slot="footer" variant="accent" on:click={() => settingsDialogOpen = false}>{$_("settings.done")}</Button>
    </ContentDialog>

    <Info />
  </main>
{/if}

<style lang="scss">
	@use "./Idle";
</style>