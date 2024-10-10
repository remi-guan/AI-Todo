<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div class="w-full max-w-3xl m-auto mt-4 space-y-2 col-span-full row-span-full" in:fade>
  <p class="alert bg-base-100 flex justify-center">
    Generating response, please wait...
    <span class="loading loading-spinner"></span>
  </p>
  <div class="skeleton w-full h-20"></div>
  <div class="skeleton w-full h-60"></div>
  <div class="skeleton w-full h-20"></div>
</div>
