<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<nav aria-label="Main Navigation" class="navbar z-20 bg-base-100 top-0 sticky">
  <div class="navbar-start">
    <label aria-label="Open Menu" class="btn btn-ghost" for="my-drawer">
      <i aria-hidden="true" class="fas fa-bars"></i>
    </label>
  </div>
  <div class="navbar-center">
    <a aria-label="Navigate to Home" class="btn btn-ghost text-xl font-bold" href="/">AI Todo</a>
  </div>
  <div class="navbar-end gap-2">
    <button
      aria-label={$_('Create A New Todo')}
      class="btn btn-ghost tooltip tooltip-left"
      data-tip={$_('Create A New Todo')}
      onclick={() => window.location.reload()}
    >
      <i aria-hidden="true" class="fa-solid fa-pen-to-square"></i>
    </button>
  </div>
</nav>
