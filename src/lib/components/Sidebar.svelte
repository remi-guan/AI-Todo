<script lang="ts">
  import axios from 'axios';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { stopPropagation } from '$lib/utils';
  import { infosStore } from '$lib/store/infos.svelte';
  import { responseStore } from '$lib/store/response.svelte';
  import type { Info } from '$lib/database/schema';
  import toast from 'svelte-french-toast';
  import Badge from '$lib/components/utils/Badge.svelte';
  import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
  import ThemeSwitchDropdown from '$lib/components/dropdowns/ThemeSwitchDropdown.svelte';
  import LanguageSwitchDropdown from '$lib/components/dropdowns/LanguageSwitchDropdown.svelte';

  interface Props {
    hide: () => void;
  }

  const { hide }: Props = $props();
  let deletingTodo: Info | undefined = $state();

  async function getResponseByInfoId(id: number) {
    const { data } = await axios.get(`/api/response/${id}`);
    responseStore.set(data);
    hide();
  }

  function handleDeleteButtonClick(info: Info) {
    deletingTodo = info;
    // eslint-disable-next-line no-undef
    confirm_delete_todo.showModal();
  }

  async function deleteTodo() {
    await toast.promise(
      axios.delete(`/api/response/${deletingTodo!.id}`),
      {
        loading: 'Deleting...',
        success: 'Delete success',
        error: 'Delete failed'
      }
    );
    infosStore.update();
  }

  onMount(infosStore.update);
</script>

<ul class="menu max-h-full bg-base-200 w-80 p-3 pt-20 flex-nowrap">
  {#if infosStore.isEmpty}
    <div class="text-xl">{$_('Previous Todos')}</div>
    <li class="text-center opacity-50">{$_('Your previous sessions display here')}</li>
  {:else}
    <h1 class="text-xl">{$_('Previous Todos')}</h1>
    <div class="overflow-y-auto mb-12 mt-4 space-y-6">
    {#each Object.entries(infosStore.infos) as [category, infos]}
      <div>
        <Badge class="mb-4" category={category} icon={infos[0].icon} />
        <ul>
        {#each infos as info}
          <li>
            <div
              role="button"
              tabindex="0"
              onkeydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  getResponseByInfoId(info.id);
                }
              }}
              onclick={() => getResponseByInfoId(info.id)}
              class="btn w-full bg-base-300 my-1 p-1 relative group"
            >
              <span class="absolute left-6 top-[30%]">{info.icon}</span>
              <span>{info.title}</span>
              <button
                class="lg:opacity-0 group-hover:opacity-100 btn-sm transition-all duration-300 btn btn-ghost absolute right-4 top-[15%]"
                title="Delete todo"
                aria-label="Delete todo"
                data-tooltip="Delete todo"
                onclick={stopPropagation(() => handleDeleteButtonClick(info))}
              >
                <i class="fa-solid fa-x text-sm"></i>
              </button>
            </div>
          </li>
        {/each}
        </ul>
      </div>
    {/each}
    </div>
  {/if}
  <div class="fixed left-2 bottom-2 flex">
    <LanguageSwitchDropdown />
    <ThemeSwitchDropdown />
  </div>
</ul>

<ConfirmModal
  confirm={deleteTodo}
  danger
  modalId="confirm_delete_todo"
  text="You're going to delete {deletingTodo?.icon} {deletingTodo?.title}. This action can't be recovered. Are you sure?"
  title="Deleting Todo"
/>