<script lang="ts">
	import { onMount } from "svelte"
	import { beepAudio } from "$lib"

	onMount(() => {
		beepAudio.beep = new Audio("/beep.wav")
	})
</script>

<slot />