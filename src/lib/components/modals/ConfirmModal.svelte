<script lang="ts">
  import { _ } from 'svelte-i18n';

  interface Props {
    title: string;
    text: string;
    modalId: string;
    confirm: () => Promise<void>
    danger:boolean
  }
  const { title, text, modalId, confirm, danger }: Props = $props();
</script>

<dialog class="modal" id="{modalId}">
  <div class="modal-box">
    <h3 class="text-lg font-bold">{title}</h3>
    <p class="py-4">{text}</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn mr-2" class:btn-error={danger} class:btn-primary={!danger} onclick={confirm}>{$_('Confirm')}</button>
        <button class="btn">{$_('Close')}</button>
      </form>
    </div>
  </div>
</dialog>