import { get } from "svelte/store"
import { ends } from "$lib/settings"
import { defaultValue } from "$util/store-utils"

export type ClockState = "idle" | "walkup" | "end"

export type FiringRotation = "AB" | "CD"

export const state = defaultValue("idle" as ClockState)

export const currentEnd = defaultValue(1)
export const nowShooting = defaultValue("AB" as FiringRotation)

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
