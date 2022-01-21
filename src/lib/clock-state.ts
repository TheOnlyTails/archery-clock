import { derived, get, type Readable, writable } from "svelte/store"
import { ends, firingRotationType } from "$lib/settings"
import { defaultValue } from "$util/store-utils"

export type ClockState = "idle" | "walkup" | "end"
export type FiringRotation = "AB" | "CD"

export const state = defaultValue<ClockState>("idle")

export const currentEnd = defaultValue(1)
currentEnd.subscribe((value) => {
  console.log(`currentEnd: ${ value }`)
  if (value > get(ends) || value < 0) currentEnd.set(1)
})

export const isStartingEnd = writable(true)
isStartingEnd.subscribe(val => console.log(`isStartingEnd: ${ val }`))

/**
 * Who is shooting at this part of the end
 */
export const nowShooting: Readable<FiringRotation> = derived([currentEnd, isStartingEnd, firingRotationType],
  ([end, startingEnd, rotationType]) => {
    if (rotationType === "ABCD") { // check rotation type
      if (startingEnd) { // check end part
        return end % 2 === 1 ? "AB" : "CD" // check end parity
      } else {
        return end % 2 === 1 ? "CD" : "AB"
      }
    } else return "AB"
  },
)
nowShooting.subscribe(val => console.log(`nowShooting: ${ val }`))

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