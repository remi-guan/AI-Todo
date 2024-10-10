<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<nav class="navbar z-20 bg-base-100 top-0 sticky">
  <div class="navbar-start">
    <label class="btn btn-ghost" for="my-drawer">
      <i class="fas fa-bars"></i>
    </label>
  </div>
  <div class="navbar-center">
    <a class="btn btn-ghost text-xl font-bold" href="/">AI Todo</a>
  </div>
  <div class="navbar-end gap-2">
    <button
      aria-label={$_('Create A New Todo')}
      class="btn btn-ghost tooltip tooltip-left"
      data-tip={$_('Create A New Todo')}
      onclick={() => window.location.reload()}
    >
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
  </div>
</nav>
