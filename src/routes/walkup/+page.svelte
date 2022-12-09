<script lang="ts">
  import { onMount } from "svelte"
  import { changeState } from "$lib/clock-state"
  import { walkupLength } from "$lib/settings"
  import { _ } from "svelte-i18n"
  import { page } from "$app/stores"
  import { beepAudio, NextButton } from "$lib"

  /**
   * number of seconds during walkup
   */
  let walkupTimer = $walkupLength

  onMount(() => {
    setInterval(() => walkupTimer--, 1000)
  })

  $: if (walkupTimer <= 0) {
    // move to end
    (async () => await beepAudio.playBeep())()
    changeState($page)
  }
</script>

<main class="walkup">
  <h1>{$_("walkup.title")}</h1>
  <p>{walkupTimer}</p>
  <NextButton />
</main>

<style lang="scss">
	@use "src/styles/pages/Walkup";
</style>