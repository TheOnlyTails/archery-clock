<script lang="ts">
  import { changeState, state } from "$lib/clock-state"
  import { Idle, Walkup } from "$lib"

  import "fluent-svelte/theme.css"

  const handleKeys = (e: KeyboardEvent) => {
    if (
      e.key === "Enter" ||
      e.key === " " ||
      e.key === "Tab" ||
      e.key === "ArrowLeft"
    ) {
      e.preventDefault()
      changeState()
    }
  }
</script>

<svelte:window
  on:click={changeState}
  on:keydown={handleKeys}
/>

{#if $state === "idle"}
  <Idle />
{:else if $state === "walkup"}
  <Walkup />
{:else if $state === "end"}
  Now in end
{/if}

<style global lang="scss">
	body {
		margin: 1rem;
		background: var(--fds-solid-background-base);
		color: var(--fds-text-primary);
		font-family: var(--fds-font-family-display);
		font-size: 1rem;
	}
</style>