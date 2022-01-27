import { get } from "svelte/store"
import { beepVolume } from "$lib/settings"

export const beep = new Audio("/beep.wav")
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

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