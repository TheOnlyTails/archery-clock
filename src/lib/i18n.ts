import { addMessages, getLocaleFromNavigator, init } from "svelte-i18n"
import en from "./locales/en.json"
import he from "./locales/he.json"

export default () => {
  addMessages("en", en)
  addMessages("he", he)

  init({
    fallbackLocale: "he",
    initialLocale: getLocaleFromNavigator(),
  })
}
