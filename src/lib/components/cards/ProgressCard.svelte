<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { confetti } from '@neoconfetti/svelte';
  import toast from 'svelte-french-toast';
  import BorderBeam from '$lib/components/utils/BorderBeam.svelte';

  interface Props {
    current: number;
    total: number;
  }

  const { current, total }: Props = $props();
  const value = $derived(Math.round(100 / total * current) || 0);
  const finished = $derived(value === 100);

  $effect(() => {
    if (finished) {
      toast('Congrats! You have finished your todo!', {
        icon: '🎉'
      });
    }
  });
</script>

<div class="alert p-6 bg-base-100 flex flex-col items-start relative">
  <BorderBeam duration={10} size={140} />
  <h2 class="card-title text-lg">{$_('Your Progress')} <i class="fa-solid fa-hourglass-2 pl-1 mt-1"></i></h2>
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

{#if finished}
  <div class="!fixed top-6 left-1/2" use:confetti></div>
{/if}
