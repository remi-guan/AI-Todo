<script lang="ts">
  import axios, { AxiosError } from 'axios';
  import { _ } from 'svelte-i18n';
  import { sum } from 'lodash-es';
  import { cn, preventDefault, scrollIntoViewAndWait, getTotalTasks } from '$lib/utils';
  import { fade } from 'svelte/transition';
  import { infosStore } from '$lib/store/infos.svelte';
  import { responseStore } from '$lib/store/response.svelte';
  import Badge from '$lib/components/utils/Badge.svelte';
  import ResultCard from '$lib/components/cards/ResponseCard.svelte';
  import ProgressCard from '$lib/components/cards/ProgressCard.svelte';
  import LoadingSkeleton from '$lib/components/feedback/LoadingSkeleton.svelte';
  import ErrorPage from '$lib/components/feedback/ErrorPage.svelte';

  let stepIndex = $state(0);
  let userPrompt = $state('');
  let errorMessage = $state('');
  let loading = $state(false);

  let cards: HTMLElement[] = $state([]);
  let container: HTMLElement | undefined = $state();

  const totalTasks = $derived(responseStore.response ? getTotalTasks(responseStore.response) : 0);
  const completedTasks = $derived(sum(responseStore.response
                                                   ?.steps
                                                   ?.map(step => step.completions.map(completion => completion.value))
                                                   ?.flat()));

  async function fetchResponse() {
    loading = true;
    try {
      const { data } = await axios.post('/api/response', { prompt: userPrompt || 'How to make egg tarts?' });
      responseStore.set(data);
      infosStore.update();
    } catch (error) {
      errorMessage = (error as AxiosError<{message: string}>)?.response?.data?.message ?? (error as Error).message;
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    const options = {
      root: null,
      threshold: 0.5 // Trigger when 50% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stepIndex = Number((entry.target as HTMLDivElement).dataset.index ?? 0);
        }
      });
    }, options);

    // Observe each ResultCard
    cards.forEach(card => observer.observe(card));
  });
</script>

<section class="grid">
{#if !responseStore.response && !loading && !errorMessage}
  <section class="col-span-full row-span-full" aria-labelledby="task-prompt">
    <form class="flex flex-col gap-4 col-span-full row-span-full w-full" transition:fade onsubmit={preventDefault(fetchResponse)}>
      <label for="prompt" id="task-prompt" class="text-lg">{$_("What's your next todo?")}</label>
      <input
        bind:value={userPrompt}
        id="prompt"
        name="prompt"
        type="text"
        class="input input-bordered w-full placeholder-gray-600"
        placeholder={$_('How to make egg tarts?')}
      />
      <button
        type="submit"
        class={cn(
          "w-full btn rounded-3xl flex gap-4 mt-2",
          "dark:border-[rgba(150,92,201,.342)] dark:bg-[rgba(0,0,0,.22)] dark:text-white dark:hover:shadow-[0_0_5px_#ffffff77,-5px_0_20px_rgba(255,0,255,.7),5px_0_20px_rgba(0,255,255,.7)]",
          "border border-[rgba(92,150,201,.342)] bg-[rgba(255,255,255,.85)] hover:bg-[rgba(255,255,255,.45)] text-[rgba(0,0,0,.8)] hover:text-black hover:shadow-[0_0_2px_#00000033,-2px_0_20px_rgba(0,128,255,.7),2px_0_8px_rgba(128,0,255,.7)]",
        )}>
        <i class="fa-solid fa-wand-magic-sparkles"></i>
        {$_('Generate')}
      </button>
    </form>
  </section>
{:else if loading}
  <section class="col-span-full row-span-full" aria-live="polite">
    <LoadingSkeleton />
  </section>
{:else if errorMessage}
  <section class="col-span-full row-span-full" aria-live="polite" aria-describedby="error-message">
    <ErrorPage errorMessage={errorMessage} retry={() => errorMessage = ''} />
  </section>
{:else if responseStore.response}
  {@const { info, steps } = responseStore.response}
  {#key info.id}
  <article bind:this={container} class="flex flex-col max-w-[88vw] lg:max-w-[60vw] gap-4 col-span-full row-span-full" in:fade>
    <header class="flex items-center gap-2">
      <h1 class="text-3xl font-bold">{info.title}</h1>
      <Badge category={info.category} icon={info.icon} />
    </header>

    <section aria-label="Steps">
      <ul class="steps bg-base-100 py-5 rounded-2xl w-full">
        {#each steps as step, i}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
          <li
            class="step cursor-pointer step-info text-info"
            class:step-info={stepIndex === i}
            class:text-info={stepIndex === i}
            onclick={async () => {
              if (container && cards[i]) {
                await scrollIntoViewAndWait(container);
                cards[i].scrollIntoView({ block: "nearest", behavior: "smooth" });
              }
            }}
            data-content={step.icon}
          >
            {step.title}
          </li>
        {/each}
      </ul>
    </section>

    <section class="w-full overflow-scroll snap-x snap-mandatory scroll-auto no-scrollbar" aria-label="Task steps">
      <div class="flex gap-36 justify-between w-fit">
        {#each steps as step, i}
          <div bind:this={cards[i]} data-index={i}>
            <ResultCard step={step} moneyUnit={info.moneyUnit} />
          </div>
        {/each}
      </div>
    </section>

    <section aria-label="Progress">
      <ProgressCard total={totalTasks} current={completedTasks} />
    </section>
  </article>
  {/key}
{/if}
</section>