<script lang="ts">
	import { currentScreen } from "$lib/clock-state"
	import Play from "@fluentui/svg-icons/icons/play_16_regular.svg?raw"
	import { Button } from "fluent-svelte"
	import { _ } from "svelte-i18n"
</script>

<Button on:click class="next-button" variant="accent">
	{@html Play}
	{#if $currentScreen === "idle"}
		{$_("next_button.start")}
	{:else}
		{$_("next_button.continue")}
	{/if}
</Button>
