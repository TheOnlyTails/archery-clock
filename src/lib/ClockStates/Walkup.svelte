<script lang="ts">
  import { onMount } from "svelte"
  import { changeState } from "$lib/clock-state"
  import { walkupLength } from "$lib/settings"

  /**
   * number of seconds during walkup
   */
  let walkupTimer = 0

  onMount(() => {
    setInterval(() => walkupTimer++, 1000)
  })

  $: if (walkupTimer > $walkupLength) changeState()
</script>

Now in walkup: {walkupTimer} seconds passed