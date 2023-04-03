<script lang="ts">
	import { IdleInfo, NextButton, SettingsDialog } from "$lib"
	import { currentEnd, isStartingEnd } from "$lib/clock-state"
	import { _ } from "svelte-i18n"

	import Reset from "@fluentui/svg-icons/icons/arrow_counterclockwise_16_regular.svg?raw"
	import Settings from "@fluentui/svg-icons/icons/settings_16_regular.svg?raw"

	import { Button } from "fluent-svelte"

	let settingsDialogOpen = false

	const resetClock = () => {
		$isStartingEnd = true
		currentEnd.setToDefault()
	}
</script>

<main class="idle">
	<h1>{$_("title")}</h1>
	<p class="description">{$_("press_to_begin")}</p>

	<div class="buttons">
		<Button class="settings-button" on:click={() => (settingsDialogOpen = true)}>
			{@html Settings}
			{$_("settings.button")}
		</Button>
		<NextButton />
		{#if $currentEnd > 1 || !$isStartingEnd}
			<Button class="reset-button" on:click={resetClock}>
				{@html Reset}
				{$_("reset_button")}
			</Button>
		{/if}
	</div>
	<IdleInfo />

	<SettingsDialog bind:open={settingsDialogOpen} />
</main>

<style>
	@import "./Idle.css";
</style>
