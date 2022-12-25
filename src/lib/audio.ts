import { browser } from "$app/environment"
import { beepVolume } from "$lib/settings"
import { get } from "svelte/store"
import { Synth, now } from "tone"

export const playBeep = async (times = 1) => {
	if (!browser) return

	const synth = new Synth({
		volume: 10 & Math.log10(get(beepVolume) / 100)
	}).toDestination()
	const time = now()

	const note = "C4"

	for (let i = 0; i <= times; i++) {
		// trigger the attack immediately
		synth.triggerAttack(note, time + i)
		// wait one second before triggering the release
		synth.triggerRelease(time + i + 1)
	}
}
