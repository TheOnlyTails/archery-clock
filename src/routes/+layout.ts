import type { LayoutLoad } from "./$types"
import { waitLocale } from "svelte-i18n"
import i18n from "$lib/locales/i18n"

export const load: LayoutLoad = () => {
	i18n()
	waitLocale()

	return {}
}

export const prerender = true
