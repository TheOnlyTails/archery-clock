<script lang="ts">
  import { changeState, state } from "$lib/clock-state"
  import { Button } from "fluent-svelte"
  import Play from "@fluentui/svg-icons/icons/play_16_regular.svg?raw"
  import { _ } from "svelte-i18n"
  import { beepAudio } from "$lib/audio"

  const handleClick = () => {
    if ($state !== "end") {
      beepAudio.playBeep($state === "idle" ? 2 : 1)
      changeState()
    }
  }
</script>

<Button class="next-button" on:click={handleClick} on:click variant="accent">
  {@html Play} {$_(`next_button.${$state === "idle" ? "start" : "continue"}`)}
</Button>