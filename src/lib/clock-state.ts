import { get, writable, type Writable } from "svelte/store"
import { ends } from "$lib/settings"

export type ClockState = "idle" | "walkup" | "end"

export type Shooters = "AB" | "CD"

export const state: Writable<ClockState> = writable("idle")

export const currentEnd = writable(1)
export const nowShooting: Writable<Shooters> = writable("AB")

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
