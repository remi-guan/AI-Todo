<script lang="ts">
  interface Props {
    variable?: number | string;
    prefix: string;
    unit: string;
  }

  const { variable, prefix, unit }: Props = $props();
</script>

{#if variable}
  <span class="badge badge-neutral py-3 space-x-2">
    <span>{prefix}</span>
    <span>{variable}{unit}</span>
  </span>
{/if}
