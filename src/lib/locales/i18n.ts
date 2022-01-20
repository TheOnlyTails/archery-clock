import { addMessages, getLocaleFromNavigator, init } from "svelte-i18n"
import en from "./en.json"
import he from "./he.json"

export default () => {
  addMessages("en", en)
  addMessages("he", he)

  init({
    fallbackLocale: "he",
    initialLocale: getLocaleFromNavigator(),
  })
}
