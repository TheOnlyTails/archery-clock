<script lang="ts">
	import { changeState } from "$lib/clock-state"
	import { page } from "$app/stores"
	import { Button } from "fluent-svelte"
	import Play from "@fluentui/svg-icons/icons/play_16_regular.svg?raw"
	import { _ } from "svelte-i18n"
	import { beepAudio } from "$lib/audio"

	const handleClick = () => {
		if ($page.route.id !== "/end") {
			beepAudio.playBeep($page.route.id === "/" ? 2 : 1)
			changeState($page)
		}
	}
</script>

<Button class="next-button" on:click={handleClick} on:click variant="accent">
	{@html Play}
	{#if $page.route.id === "/"}
		{$_("next_button.start")}
	{:else}
		{$_("next_button.continue")}
	{/if}
</Button>
