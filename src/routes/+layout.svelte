<script lang="ts">
  import '../app.pcss';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import Nav from '$lib/components/Nav.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { locale, isLoading } from 'svelte-i18n';

  let { children } = $props();

  function setLocale(lang: string) {
    // Functional programming to simplify call
    return () => {
      // preserve for next time page reload
      window.location.hash = `lang=${lang}`;
      locale.set(lang)
    }
  }
</script>

<div class="drawer h-full w-full bg-base-200">
  <input class="drawer-toggle" id="my-drawer" type="checkbox" />
  <div class="drawer-content">
    <Nav />
    {#key $page.url.pathname}
      <!-- Handles each time the router change, because it should reloads <main>, need this to work with `#key` -->
      <main class="px-[6vw] lg:px-[20vw] mt-8 m-auto flex flex-col gap-4 bg-base-200 pb-24 overflow-y-hidden" in:fade={{ duration: 200 }}>
      {#if $isLoading}
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

<div class="dropdown dropdown-start dropdown-top fixed left-2 bottom-2">
  <div aria-label="Languages" class="btn btn-ghost px-4" role="button" tabindex="0" title="Change Language">
    <svg class="h-5 w-5 " fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M11 5a.75.75 0 0 1 .688.452l3.25 7.5a.75.75 0 1 1-1.376.596L12.89 12H9.109l-.67 1.548a.75.75 0 1 1-1.377-.596l3.25-7.5A.75.75 0 0 1 11 5Zm-1.24 5.5h2.48L11 7.636 9.76 10.5ZM5 1a.75.75 0 0 1 .75.75v1.261a25.27 25.27 0 0 1 2.598.211.75.75 0 1 1-.2 1.487c-.22-.03-.44-.056-.662-.08A12.939 12.939 0 0 1 5.92 8.058c.237.304.488.595.752.873a.75.75 0 0 1-1.086 1.035A13.075 13.075 0 0 1 5 9.307a13.068 13.068 0 0 1-2.841 2.546.75.75 0 0 1-.827-1.252A11.566 11.566 0 0 0 4.08 8.057a12.991 12.991 0 0 1-.554-.938.75.75 0 1 1 1.323-.707c.049.09.099.181.15.271.388-.68.708-1.405.952-2.164a23.941 23.941 0 0 0-4.1.19.75.75 0 0 1-.2-1.487c.853-.114 1.72-.185 2.598-.211V1.75A.75.75 0 0 1 5 1Z" fill-rule="evenodd"></path></svg>
  </div>
  <ul class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-1">
    <li><button onclick={setLocale('en')}><span class="badge">EN</span> English</button></li>
    <li><button onclick={setLocale('zh')}><span class="badge">ZH</span> 中文简体</button></li>
  </ul>
</div>
