<script lang="ts">
  import { fade } from 'svelte/transition';

  interface Props {
    errorMessage: string;
    retry: (event: MouseEvent) => void;
  }

  const { errorMessage, retry }: Props = $props();
</script>

<div class="col-span-full row-span-full flex flex-col gap-4" transition:fade>
  <div class="alert alert-error">
    {errorMessage}
  </div>

  <p>😫 Oops! The request isn't working...</p>
  <p>Please try to fix it by checking the error message above. Afterward you can retry.</p>

  <button class="btn btn-neutral w-full" onclick={retry}>
    <i class="fa-solid fa-rotate-right"></i>
    Retry
  </button>
</div>