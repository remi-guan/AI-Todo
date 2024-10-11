<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { fade } from 'svelte/transition';

  interface Props {
    errorMessage: string;
    retry: (event: MouseEvent) => void;
  }

  const { errorMessage, retry }: Props = $props();
</script>

<section aria-label="Error Handling Section" class="flex flex-col gap-4" transition:fade>
  <div class="alert alert-error">
    {errorMessage}
  </div>

  <p>😫 {$_("Oops! The request isn't working...")}</p>
  <p>{$_('Please try to fix it by checking the error message above. Afterward you can retry.')}</p>

  <button class="btn btn-neutral w-full" onclick={retry}>
    <i class="fa-solid fa-rotate-right"></i>
    {$_('Retry')}
  </button>
</section>