<script lang="ts">
  import { sum } from 'lodash-es';
  import { fly } from 'svelte/transition';
  import { _ } from 'svelte-i18n';
  import { cn } from '$lib/utils';
  import axios from 'axios';
  import type { ParsedResponse } from '$lib/schemas';
  import { scrollIntoViewAndWait } from '$lib/utils.js';
  import ResultCard from '$lib/components/ResultCard.svelte';
  import ProgressCard from '$lib/components/ProgressCard.svelte';
  import GeneratingPlaceholder from '$lib/components/GeneratingPlaceholder.svelte';

  let stepIndex = $state(0);
  let totalTasks = $state(0);
  let userPrompt = $state('');

  let cards: HTMLDivElement[] = $state([]);
  let response: ParsedResponse | undefined = $state();
  let container: HTMLDivElement | undefined = $state();

  let loading = $state(false);

  const completedTasks = $derived(sum(response?.steps.map(step => step.completions).flat()));

  async function fetchResponse() {
    loading = true;
    const { data } = await axios.post('/api/response', { prompt: userPrompt })
    response = data.response;
    totalTasks = data.totalTasks;
    loading = false;
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

{#if loading}
  <!-- Display skeleton while data is being generated -->
  <GeneratingPlaceholder />
{:else if !response}
  <div class="flex flex-col gap-4" transition:fly={{ x: -1000, duration: 400 }}>
    <label for="prompt" class="text-lg">{$_("What's your next todo?")}</label>
    <input
      bind:value={userPrompt}
      id="prompt"
      name="prompt"
      type="text"
      class="input input-bordered w-full placeholder-gray-600"
      placeholder={$_('How to make egg tarts?')}
      required
    />

    <button
      onclick={fetchResponse}
      class={cn(
        "w-full m-auto btn rounded-3xl flex gap-4 mt-4",
        "border border-[rgba(150,92,201,.342)] bg-[rgba(0,0,0,.22)] hover:text-white",
        "hover:shadow-[0_0_5px_#ffffff77,-5px_0_20px_rgba(255,0,255,.7),5px_0_20px_rgba(0,255,255,.7)]"
    )}>
      <i class="fa-solid fa-wand-magic-sparkles"></i>
      {$_('Generate')}
    </button>
  </div>
{:else}
  {@const { info, steps } = response}

  <div bind:this={container} class="flex flex-col gap-4" transition:fly={{ x: 1000, duration: 400 }}>
    <div class="flex items-center gap-2">
      <h1 class="text-3xl font-bold">{info.title}</h1>
      <span class="badge badge-info p-3">
        <span class="text-xl pr-1 pb-1">{info.icon}</span>{info.category}
      </span>
    </div>

    <!-- Steps display -->
    <ul class="steps bg-base-100 py-5 rounded-2xl">
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

    <div class="w-full overflow-scroll snap-x snap-mandatory scroll-auto no-scrollbar">
      <section class="flex gap-36 justify-between w-fit">
        {#each steps as step, i}
          <div bind:this={cards[i]} data-index={i}>
            <ResultCard step={step} moneyUnit={info.moneyUnit} />
          </div>
        {/each}
      </section>
    </div>

    <ProgressCard total={totalTasks} current={completedTasks} />
  </div>
{/if}
