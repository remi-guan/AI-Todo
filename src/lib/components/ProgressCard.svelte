<script lang="ts">
  import { _ } from 'svelte-i18n';
  import BorderBeam from '$lib/components/BorderBeam.svelte';

  interface Props {
    current: number;
    total: number;
  }

  const { current, total }: Props = $props();
  const value = $derived(Math.round(100 / total * current) || 0);
  const finished = $derived(value === 100);
</script>

<div class="alert p-6 bg-base-100 flex flex-col items-start relative">
  <BorderBeam duration={10} size={140} />
  <h2 class="card-title text-lg">{$_('Your Progress')} <i class="fa fa-hourglass-2 pl-1 mt-1"></i></h2>
  <div class="py-4 px-8 box-border w-full">
    <p>"All our dreams can come true, if we have the courage to pursue them."</p>
    <p class="text-end">—— Walt Disney</p>
  </div>
  <progress
    class="progress w-full"
    class:progress-info={!finished}
    class:progress-success={finished}
    max="100"
    value={value}
  ></progress>
</div>
