import { get } from "svelte/store"
import { beepVolume } from "$lib/settings"

export const beepAudio: { beep: HTMLAudioElement | undefined, playBeep: (times?: number) => void} = {
  beep: undefined,
  playBeep: async (times = 1) => {
    if (beepAudio.beep) {
      beepAudio.beep.volume = get(beepVolume) / 100
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
  }

}

const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))