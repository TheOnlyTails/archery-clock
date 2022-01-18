<script lang="ts">
  import { fly } from "svelte/transition"
  import { onMount } from "svelte"
  import { currentEnd, nowShooting } from "$lib/clock-state"
  import { endLength, endParts, ends, walkupLength, warningTimeUntilEnd } from "$lib/settings"

  import { Button, Checkbox, ContentDialog, IconButton, NumberBox } from "fluent-svelte"
  import Settings from "@fluentui/svg-icons/icons/settings_16_regular.svg?raw"

  let loaded = false

  let settingsDialogOpen = false

  onMount(() => {
    loaded = true
  })
</script>

{#if loaded}
  <div in:fly={{ y: -6, duration: 400 }}>
    <h1>Archer Clock</h1>
    <p>Press any key to begin walkup</p>
    <h2>Current End: {$currentEnd}/{$ends}</h2>
    <h3>Up next: {$nowShooting}</h3>

    <IconButton on:click={() => settingsDialogOpen = true}>
      {@html Settings}
    </IconButton>
    <ContentDialog bind:open={settingsDialogOpen} title="Clock Settings" class="settings-dialog">
      <div class="settings">
        <label for="setting-ends">Ends per round (Default: {ends.defaultValue})</label>
        <NumberBox id="setting-ends" bind:value={$ends} min={1} max={50} inline />

        <label for="setting-end-parts">ABCD Enabled (Default: {endParts.defaultValue})</label>
        <Checkbox id="setting-end-parts" bind:checked={$endParts} />

        <label for="setting-end-length">End Length in seconds (Default: {endLength.defaultValue})</label>
        <NumberBox id="setting-end-length" bind:value={$endLength} min={10} max={3600} inline />

        <label for="setting-walkup-length">Walkup Length in seconds (Default: {walkupLength.defaultValue})</label>
        <NumberBox id="setting-walkup-length" bind:value={$walkupLength} min={10} max={300} inline />

        <label for="setting-warning-time">Warning time in seconds before the end of an End
          (Default: {warningTimeUntilEnd.defaultValue})</label>
        <NumberBox id="setting-warning-time" bind:value={$warningTimeUntilEnd} min={10} max={300} inline />
      </div>
      <Button slot="footer" variant="accent" on:click={() => settingsDialogOpen = false}>Done</Button>
    </ContentDialog>
  </div>
{/if}

<style lang="scss">
	@use "./Idle";
</style>