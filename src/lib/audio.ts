import { browser } from "$app/environment"
import { beepVolume } from "$lib/settings"
import { get } from "svelte/store"
import { Loop, Synth, now } from "tone"

export const playBeep = async (times = 1) => {
	if (!browser) return

	const synth = new Synth({
		volume: 10 & Math.log10(get(beepVolume) / 100),
	}).toDestination()
	const time = now()

	const note = "F5"
	const interval = 0.4
	const duration = 1

	const loop = new Loop(() => {
		// trigger the attack immediately
		synth.triggerAttack(note, time)
		// wait one second before triggering the release
		synth.triggerRelease(time + duration)
	}, interval)

	loop.start()

	setTimeout(loop.stop, times * (interval + duration) * 1000)
}
