import { defaultValue } from "$lib/stores"

/**
 * How much time is given to walk up to the shooting line
 */
export const walkupLength = defaultValue(10)

/**
 * How long is each end
 */
export const endLength = defaultValue(90)

/**
 * How many seconds before the end of the end to show a warning
 */
export const warningTimeUntilEnd = defaultValue(30)

/**
 * How many ends are in the round
 */
export const ends = defaultValue(10)

/**
 * Toggles whether each end has 2 parts (AB-CD)
 */
export const firingRotationType = defaultValue<"AB" | "ABCD">("AB")

/**
 * How loud the beep is
 */
export const beepVolume = defaultValue(0.5)
beepVolume.subscribe((v) => beepVolume.set(Math.floor(v * 100) / 100))
