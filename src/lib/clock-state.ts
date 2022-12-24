import { derived, get, type Readable, writable } from "svelte/store"
import { ends, firingRotationType } from "$lib/settings"
import { defaultValue } from "$lib/stores"
import { goto } from "$app/navigation"
import type { Page } from "@sveltejs/kit"

export type FiringRotation = "AB" | "CD"

export const currentEnd = defaultValue(1)
currentEnd.subscribe((value) => {
  if (value > get(ends) || value < 0) currentEnd.set(1)
})

export const isStartingEnd = writable(true)

/**
 * Who is shooting at this part of the end
 */
export const nowShooting: Readable<FiringRotation> = derived([currentEnd, isStartingEnd, firingRotationType],
  ([end, startingEnd, rotationType]) => {
    if (rotationType === "ABCD")
      // if the end is starting and is odd, or is ending and is even, use AB
      // if it's ending and is odd, or is starting and is even, use CD
      return (startingEnd) === (end % 2 === 1) ? "AB" : "CD"
    else return "AB"
  },
)

export const nextState = (current: Page): string => {
  switch (current.route.id) {
    case "/":
      return "/walkup"
    case "/walkup":
      return "/end"
    default:
      return "/"
  }
}
/**
 * Update the clock state with the next state
 */
export const changeState = (current: Page) => goto(nextState(current))