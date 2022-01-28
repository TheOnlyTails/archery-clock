<!--suppress XmlInvalidId -->
<script lang="ts">
  import { onMount } from "svelte"
  import { fly } from "svelte/transition"
  import { _ } from "svelte-i18n"
  import { currentEnd, isStartingEnd } from "$lib/clock-state"
  import { beepVolume, endLength, ends, firingRotationType, walkupLength, warningTimeUntilEnd } from "$lib/settings"
  import { Info, NextButton } from "$lib"
  import type { DefaultValueStore } from "$util/store-utils"

  import { Button, ComboBox, ContentDialog, NumberBox, Slider } from "fluent-svelte"
  import Settings from "@fluentui/svg-icons/icons/settings_16_regular.svg?raw"
  import Reset from "@fluentui/svg-icons/icons/arrow_counterclockwise_16_regular.svg?raw"
  import SpeakerSilent from "@fluentui/svg-icons/icons/speaker_0_16_filled.svg?raw"
  import SpeakerQuiet from "@fluentui/svg-icons/icons/speaker_1_16_filled.svg?raw"
  import SpeakerLoud from "@fluentui/svg-icons/icons/speaker_2_16_filled.svg?raw"

  let loaded = false

  let settingsDialogOpen = false

  const resetClock = () => {
    $isStartingEnd = true
    currentEnd.setToDefault()
  }

  const insertDefaultValue = <T>(id: string, store: DefaultValueStore<T>) => $_(id, {
    values: { default: store.defaultValue },
  })

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

    <ContentDialog class="settings-dialog"
                   bind:open={settingsDialogOpen}
                   title={$_("settings.title")}
                   size="max"
    >
      <div class="settings">
        <label for="setting-ends">{insertDefaultValue("settings.ends_per_round", ends)}</label>
        <NumberBox id="setting-ends" bind:value={$ends} min={1} max={50} inline />

        <label for="setting-firing-rotation">
          {insertDefaultValue("settings.firing_rotation", firingRotationType)}
        </label>
        <ComboBox id="setting-firing-rotation" items={[{name: "AB"},{name: "ABCD"}]} bind:value={$firingRotationType} />

        <label for="setting-end-length">{insertDefaultValue("settings.end_length", endLength)}</label>
        <NumberBox id="setting-end-length" bind:value={$endLength} min={10} max={3600} inline />

        <label for="setting-walkup-length">{insertDefaultValue("settings.walkup_length", walkupLength)}</label>
        <NumberBox id="setting-walkup-length" bind:value={$walkupLength} min={10} max={300} inline />

        <label for="setting-warning-time">{insertDefaultValue("settings.warning_time", warningTimeUntilEnd)}</label>
        <NumberBox id="setting-warning-time" bind:value={$warningTimeUntilEnd} min={10} max={300} inline />

        <label for="setting-beep-volume">{insertDefaultValue("settings.beep_volume", beepVolume)}</label>
        <Slider id="setting-beep-volume"
                bind:value={$beepVolume} suffix="%"
                min={0} max={100} step={1} ticks={[0, 25, 50, 75, 100]}
        >
          <svelte:fragment slot="tooltip" let:value let:suffix>
            {#if value > 0}
              {@html value >= 50 ? SpeakerLoud : SpeakerQuiet}
            {:else}
              {@html SpeakerSilent}
            {/if}
            {value}{suffix}
          </svelte:fragment>
        </Slider>
      </div>
      <svelte:fragment slot="footer">
        <Button on:click={() => {[
            ends, firingRotationType, endLength, walkupLength,
            warningTimeUntilEnd, beepVolume
          ].forEach(setting => setting.setToDefault())
        }}>{$_("settings.reset")}</Button>
        <Button variant="accent" on:click={() => settingsDialogOpen = false}>{$_("settings.done")}</Button>
      </svelte:fragment>
    </ContentDialog>

    <Info />
  </main>
{/if}

<style lang="scss">
	@use "./Idle";
</style>