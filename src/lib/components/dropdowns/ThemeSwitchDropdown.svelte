<script lang="ts">
  import { _ } from 'svelte-i18n';

  const themes = [
    {
      icon: 'sun',
      text: 'light'
    },
    {
      icon: 'moon',
      text: 'dark'
    },
    {
      icon: 'cake',
      text: 'cupcake'
    },
    {
      icon: 'gem',
      text: 'emerald'
    }
  ];
</script>

<div aria-label="Theme Selection" class="dropdown dropdown-start dropdown-top">
  <button aria-expanded="false" aria-haspopup="true" aria-label={$_('Change theme')} class="btn btn-ghost px-4" tabindex="0" title={$_('Change theme')}>
    <i class="fa-solid fa-swatchbook"></i>
  </button>
  <ul aria-label="Theme Options" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-1">
    {#each themes as { icon, text }}
      <li>
        <button class="btn btn-sm btn-ghost flex gap-4 px-6" data-set-theme={text} aria-label={`Set theme to ${text}`}>
          <i class="fa-solid fa-{icon}"></i>
          {text}
        </button>
      </li>
    {/each}
  </ul>
</div>
