<script lang=ts>
  import { fly } from 'svelte/transition';
</script>

<div
  class="w-full max-w-3xl m-auto mt-4"
  transition:fly={{ x: 1000, duration: 400, delay: 400}}
>
    <p class="text-center">Generating response, please wait...</p>
    <div class="skeleton w-full h-10 my-2"></div>
    <div class="skeleton w-full h-10 my-2"></div>
    <div class="skeleton w-full h-10 my-2"></div>
    <div class="skeleton w-full h-10 my-2"></div>
    <div class="skeleton w-full h-10 my-2"></div>
  </div>
