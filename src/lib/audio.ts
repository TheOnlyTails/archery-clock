import { browser } from "$app/environment"
import { beepVolume } from "$lib/settings"
import { get } from "svelte/store"

export const playBeep = async (times = 1) => {
	if (!browser) return

	const REAL_TIME_FREQUENCY = 440

	const audioContext = new AudioContext()

	const oscillator = audioContext.createOscillator()
	oscillator.frequency.value = REAL_TIME_FREQUENCY

	const gain = audioContext.createGain()
	gain.gain.setValueAtTime(get(beepVolume) / 100, audioContext.currentTime)

	oscillator.connect(gain).connect(audioContext.destination)

	for (let i = 0; i <= times; i++) {
		oscillator.start()
		oscillator.stop(audioContext.currentTime + 1)
	}
}