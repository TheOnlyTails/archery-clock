<script lang="ts">
  import { currentEnd, nowShooting } from "$lib/clock-state"
  import { ends } from "$lib/settings"
  import { _ } from "svelte-i18n"
</script>

<div class="clock-state-info">
  <h2>{$_("clock_info.current_end")}: <span>{$currentEnd}</span>/{$ends}</h2>
  <h2>{$_("clock_info.up_next")}:
    <span class:ab={$nowShooting === "AB"} class:cd={$nowShooting === "CD"}>
      {$nowShooting}
    </span>
  </h2>
</div>

<style lang="scss">
	@use "./Info";
</style>