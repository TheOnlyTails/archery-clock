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

<style>
  .clock-state-info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-block: 1rem;

    & h2 {
      margin: 0;
      font-size: 10vw;
      user-select: none;

      & span {
        color: var(--fds-system-attention);

        &.cd {
          color: var(--fds-system-critical);
        }
      }
    }
  }
</style>