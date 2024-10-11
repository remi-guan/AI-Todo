<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { fade } from 'svelte/transition';
</script>

<section aria-label="Loading Response Section" class="w-full max-w-3xl m-auto mt-4 space-y-2 col-span-full row-span-full" in:fade>
  <p aria-busy="true" aria-live="polite" class="alert bg-base-100 flex justify-center">
    {$_('Generating response, please wait...')}
    <span aria-hidden="true" class="loading loading-spinner"></span>
  </p>
  <div aria-label="Loading Placeholder" class="skeleton w-full h-20"></div>
  <div aria-label="Loading Placeholder" class="skeleton w-full h-60"></div>
  <div aria-label="Loading Placeholder" class="skeleton w-full h-20"></div>
</section>