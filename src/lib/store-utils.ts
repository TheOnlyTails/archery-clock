import { writable } from "svelte/store"

export const defaultValue = <T>(defaultValue: T) => {
  const store = writable(defaultValue)

  // if the store turns undefined, set it back to the default value
  store.subscribe(val => {
    if (!val) store.set(defaultValue)
  })

  return {
    defaultValue: defaultValue,
    ...store,
  }
}