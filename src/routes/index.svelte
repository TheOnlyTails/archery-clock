<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"
  import { waitLocale } from "svelte-i18n"
  import i18n from "$lib/locales/i18n"

  export const load: Load = () => {
    i18n()
    waitLocale()

    return { props: {} }
  }
</script>

<script lang="ts">
  import { changeState, state } from "$lib/clock-state"
  import { Idle, Walkup, End, playBeep } from "$lib"

  import "fluent-svelte/theme.css"
  import { _ } from "svelte-i18n"

  const handleKeys = (e: KeyboardEvent) => {
    if ($state !== "end" && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()

      if ($state === "idle") {
        // going to walkup
        playBeep(2)
      } else if ($state === "walkup") {
        // starting an end
        playBeep()
      }

      changeState()
    }
  }
</script>

<svelte:head>
  <title>{$_("title")}</title>
  <meta content={$_("title")} name="title">
  <meta content={$_("title")} name="og:title">
</svelte:head>

<svelte:window
  on:keydown={handleKeys}
/>

{#if $state === "idle"}
  <Idle />
{:else if $state === "walkup"}
  <Walkup />
{:else if $state === "end"}
  <End />
{/if}

<style global lang="scss">
  @use "src/styles/global";
</style>