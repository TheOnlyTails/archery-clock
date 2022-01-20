import { derived, get, type Readable } from "svelte/store"
import { ends, firingRotationType } from "$lib/settings"
import { defaultValue } from "$util/store-utils"

export type ClockState = "idle" | "walkup" | "end"

export type FiringRotation = "AB" | "CD"

export const state = defaultValue("idle" as ClockState)

export const currentEnd = defaultValue(1)
export const nowShooting: Readable<FiringRotation> = derived([currentEnd, firingRotationType],
  ([$currentEnd, $firingRotationType]) => $firingRotationType === "ABCD"
    ? $currentEnd % 2 === 1 ? "AB" : "CD"
    : "AB",
)

/**
 * Get the next clock state
 *
 * @param {ClockState} state
 * @returns {ClockState}
 */
export const nextState: (ClockState) => ClockState = (state: ClockState) => {
  switch (state) {
    case "idle":
      return "walkup"
    case "walkup":
      return "end"
    case "end":
      return "idle"
  }
}

/**
 * Update the clock state with the next state
 */
export const changeState = () => state.update((s) => nextState(s))

currentEnd.subscribe((value) => {
  if (value > get(ends) || value < 0) currentEnd.set(1)
})
