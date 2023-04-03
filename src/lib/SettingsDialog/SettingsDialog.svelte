<script lang="ts">
	import {
		beepVolume,
		endLength,
		ends,
		firingRotationType,
		walkupLength,
		warningTimeUntilEnd,
	} from "$lib/settings"
	import { Button, ComboBox, ContentDialog, NumberBox, Slider } from "fluent-svelte"
	import { _ } from "svelte-i18n"

	import SpeakerMute from "@fluentui/svg-icons/icons/speaker_mute_16_filled.svg?raw"
	import SpeakerQuiet from "@fluentui/svg-icons/icons/speaker_1_16_filled.svg?raw"
	import SpeakerLoud from "@fluentui/svg-icons/icons/speaker_2_16_filled.svg?raw"

	export let open = false

	const resetSettings = () =>
		[ends, firingRotationType, endLength, walkupLength, warningTimeUntilEnd, beepVolume].forEach(
			(s) => s.setToDefault()
		)
</script>

<ContentDialog class="settings-dialog" bind:open title={$_("settings.title")} size="max">
	<div class="settings">
		<label for="setting-ends">{$_("settings.ends_per_round")}</label>
		<NumberBox id="setting-ends" bind:value={$ends} min={1} inline />

		<label for="setting-firing-rotation">
			{$_("settings.firing_rotation")}
		</label>
		<ComboBox
			id="setting-firing-rotation"
			items={[
				{ name: "AB", value: "AB" },
				{ name: "ABCD", value: "ABCD" },
			]}
			bind:value={$firingRotationType}
		/>

		<label for="setting-end-length">{$_("settings.end_duration")}</label>
		<NumberBox id="setting-end-length" bind:value={$endLength} min={10} max={3600} inline />

		<label for="setting-walkup-length">{$_("settings.red_duration")}</label>
		<NumberBox id="setting-walkup-length" bind:value={$walkupLength} min={10} max={300} inline />

		<label for="setting-warning-time">
			{$_("settings.warning_time")}
		</label>
		<NumberBox
			id="setting-warning-time"
			bind:value={$warningTimeUntilEnd}
			min={10}
			max={300}
			inline
		/>

		<label for="setting-beep-volume">
			{$_("settings.beep_volume")}
		</label>
		<Slider
			id="setting-beep-volume"
			bind:value={$beepVolume}
			suffix="%"
			min={0}
			max={1}
			step={0.01}
			ticks={[0, 0.25, 0.5, 0.75, 1]}
		>
			<svelte:fragment slot="tooltip" let:value let:suffix>
				{#if value > 0}
					{@html value >= 0.5 ? SpeakerLoud : SpeakerQuiet}
				{:else}
					{@html SpeakerMute}
				{/if}
				&nbsp;{Math.floor(value * 100)}{suffix}
			</svelte:fragment>
		</Slider>
	</div>
	<svelte:fragment slot="footer">
		<Button class="settings-footer-button" on:click={resetSettings}>{$_("settings.reset")}</Button>
		<Button class="settings-footer-button" variant="accent" on:click={() => (open = false)}>
			{$_("settings.done")}
		</Button>
	</svelte:fragment>
</ContentDialog>
