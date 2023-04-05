import { type Writable, writable } from "svelte/store"

export type DefaultValueStore<T> = Writable<T> & {
	defaultValue: T
	setToDefault: () => void
}

export const defaultValue = <T>(defaultValue: T) => {
	const store = writable(defaultValue)

	// if the store turns undefined, set it back to the default value
	store.subscribe((val) => {
		if (val === undefined || val === null) store.set(defaultValue)
	})

	return {
		setToDefault() {
			store.set(defaultValue)
		},
		defaultValue,
		...store,
	} as DefaultValueStore<T>
}
