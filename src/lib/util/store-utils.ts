import { type Writable, writable } from "svelte/store"

type DefaultValueStore<T> = Writable<T> & { defaultValue: T }

export const defaultValue = <T>(defaultValue: T) => {
  const store = writable(defaultValue)

  // if the store turns undefined, set it back to the default value
  store.subscribe((val) => {
    if (!val) store.set(defaultValue)
  })

  return {
    defaultValue: defaultValue,
    ...store,
  } as DefaultValueStore<T>
}
