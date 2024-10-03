<script lang="ts">
  import BorderBeam from '$lib/components/BorderBeam.svelte';

  interface Props {
    current: number;
    total: number;
  }

  const { current, total }: Props = $props();
  const value = $derived(Math.round(100 / total * current));
</script>

<div class="alert p-6 bg-base-100 flex flex-col items-start relative">
  <BorderBeam duration={10} size={140} />
  <h2 class="card-title text-lg">Your Progress <i class="fa fa-hourglass-2 pl-1 mt-1"></i></h2>
  <div class="py-4 px-8 box-border w-full">
    <p
      class="text-lg"
      transition:fly={{ x: 0, y: 20, duration: 800, delay: 200 }}
    >
      "All our dreams can come true, if we have the courage to pursue them."
    </p>
    <p
      class="text-end text-lg"
      transition:fade={{ duration: 1000, delay: 500 }}
    >
      —— Walt Disney
    </p>
  </div>
  <progress class="progress progress-info w-full" max="100" value={value || 0}></progress>
</div>
