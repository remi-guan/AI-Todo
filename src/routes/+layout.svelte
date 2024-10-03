<script lang="ts">
  import '../app.pcss';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import Nav from '$lib/components/Nav.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';

  let { children } = $props();
  let loading = $state(true);

  onMount(() => {
    loading = false;
  })
</script>

<div class="drawer h-full w-full bg-base-200">
  <input class="drawer-toggle" id="my-drawer" type="checkbox" />
  <div class="drawer-content">
    <Nav />
    {#key $page.url.pathname}
      <!-- Handles each time the router change, because it should reloads <main>, need this to work with `#key` -->
      <main class="px-[6vw] lg:px-[20vw] mt-8 m-auto flex flex-col gap-4 bg-base-200 pb-24 overflow-y-hidden" in:fade={{ duration: 200 }}>
      {#if loading}
        <div class="flex items-center justify-center h-[80vh]">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
      {:else}
        <!-- Handles first time the page loads, because it loads +layout.svelte, need this to work with `loading` -->
        <div class="flex flex-col gap-4" transition:fade={{ duration: 200 }}>
          {@render children()}
        </div>
      {/if}
      </main>
    {/key}
  </div>
  <div class="drawer-side z-10">
    <label aria-label="close sidebar" class="drawer-overlay" for="my-drawer"></label>
    <Sidebar />
  </div>
</div>
