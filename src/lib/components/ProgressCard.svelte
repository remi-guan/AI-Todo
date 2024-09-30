<script lang="ts">
  import BorderBeam from '$lib/components/BorderBeam.svelte';

  interface Props {
    current: number;
    total: number;
  }

  const { current, total }: Props = $props();
  const value = $derived(100 / total * current);
</script>

<div class="alert p-5 bg-base-100 flex flex-col items-start relative">
  <BorderBeam duration={10} size={140} />
  <p>Your Progress <i class="fa fa-hourglass-2 pl-1 mt-1"></i></p>
  <div class="py-4 px-8 box-border text-gray-300 w-full">
    <p>"All our dreams can come true, if we have the courage to pursue them."</p>
    <p class="text-end">—— Walt Disney</p>
  </div>
  <progress class="progress progress-info w-full" max="100" value={value || 0}></progress>
</div>
