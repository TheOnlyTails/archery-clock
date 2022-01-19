<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"
  import { waitLocale } from "svelte-i18n"
  import i18n from "$lib/i18n"

  export const load: Load = () => {
    i18n()
    waitLocale()

    return { props: {} }
  }
</script>

<script lang="ts">
  import { changeState, state } from "$lib/clock-state"
  import { Idle, Walkup, End } from "$lib"

  import "fluent-svelte/theme.css"
  import { _ } from "svelte-i18n"

  const handleKeys = (e: KeyboardEvent) => {
    if ($state !== "end" && (
      e.key === "Enter" ||
      e.key === " " ||
      e.key === "ArrowLeft"
    )) {
      e.preventDefault()
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
	body {
		margin: 0;
		background: var(--fds-solid-background-base);
		color: var(--fds-text-primary);
		font-family: var(--fds-font-family-display);
		font-size: 1rem;
	}

	h1, h2, h3, h4, h5, h6 {
		margin: 0;
	}

	html[lang="he"], html[lang="ar"] { // this was surprisingly easy
		direction: rtl;
	}
</style>