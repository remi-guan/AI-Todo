<script lang=ts>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { groupBy } from 'lodash-es';
  import type { Info } from '@prisma/client';

  let previous: Record<string, Info[]> = $state({});
  let hasInfos = $state(false);

  onMount(async () => {
    const { data: infos } = await axios.get('/api/info-list');
    if (infos.length) {
      hasInfos = true;
    }
    previous = groupBy(infos, 'category');
  });
</script>

{#if hasInfos}
  <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4 pt-20 space-y-4">
    {#each Object.entries(previous) as [category, infos]}
      <div class="">
        <span class="badge">{category}</span>
        {#each infos as info}
          <li class="card background-base-300">{info.icon} {info.title}</li>
        {/each}
      </div>
    {/each}
  </ul>
{:else}
  <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4 pt-20">
    <li class="text-center opacity-50">{$_('Your previous sessions display here')}</li>
  </ul>
{/if}