import { get } from "svelte/store"
import { beepVolume } from "$lib/settings"

export const beep = (() => {
  const audio = new HTMLAudioElement()
  audio.src = "/beep.wav"

  return audio
})()

const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

export const playBeep = async (times: number = 1) => {
  beep.volume = get(beepVolume) / 100

  let timesPlayed = 0

  beep.onended = async () => {
    timesPlayed++
    await sleep(50)

    if (timesPlayed < times) {
      await beep.play()
    }
  }

  await beep.play()
}
