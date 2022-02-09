<script lang="ts">
	import { onMount } from "svelte"
	import { beepAudio } from "$lib"

	onMount(() => {
		// audio permalink:
		// https://sfxr.me/#57uBnWkAfvbhTZQJAyEjTczWfcRpQqAS6rvcTvCsEwUeWsFRVdaFcrDvaUXT1r2H7jCSoH4vvCYWL3YGBJaeyXmoCHYZeM2m7ibTLWyH3isMv3KX8ny7MZRYT
		beepAudio.beep = new Audio("/beep.wav")
	})
</script>

<slot />