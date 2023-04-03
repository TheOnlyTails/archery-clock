import { browser } from "$app/environment"
import { get } from "svelte/store"
import { beepVolume } from "./settings"

type AudioObject = {
	beep: HTMLAudioElement | undefined
	playBeep: (times?: number) => void
}

export const beepAudio: AudioObject = {
	beep: undefined,
	playBeep: async (times = 1) => {
		if (browser && beepAudio.beep) {
			beepAudio.beep.volume = get(beepVolume)
			let timesPlayed = 0

			beepAudio.beep.onended = async () => {
				timesPlayed++
				await sleep(50)

				if (beepAudio.beep && timesPlayed < times) {
					await beepAudio.beep.play()
				}
			}

			await beepAudio.beep.play()
		}
	},
}

export const playBeep = beepAudio.playBeep

export const sleep = async (ms = 1000) => await new Promise((resolve) => setTimeout(resolve, ms))
