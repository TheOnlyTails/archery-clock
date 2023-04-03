import { ends, firingRotationType } from "$lib/settings"
import { defaultValue } from "$lib/stores"
import { derived, get, writable, type Readable } from "svelte/store"

export type FiringRotation = "AB" | "CD"

export const currentEnd = defaultValue(1)
currentEnd.subscribe((value) => {
	if (value > get(ends) || value < 0) currentEnd.set(1)
})

export const isStartingEnd = writable(true)

export const currentScreen = defaultValue<"idle" | "red" | "green">("idle")

/**
 * Who is shooting at this part of the end
 */
export const nowShooting: Readable<FiringRotation> = derived(
	[currentEnd, isStartingEnd, firingRotationType],
	([end, startingEnd, rotationType]) => {
		if (rotationType === "ABCD")
			// if the end is starting and is odd, or is ending and is even, use AB
			// if it's ending and is odd, or is starting and is even, use CD
			return startingEnd === (end % 2 === 1) ? "AB" : "CD"
		else return "AB"
	}
)
