<script lang="ts">
  import type { Response } from '$lib/schemas';
  import { sum } from 'lodash-es';
  import { onMount } from 'svelte';
  import { getResponse } from '$lib/get-response';
  import ResultCard from '$lib/components/ResultCard.svelte';
  import ProgressCard from '$lib/components/ProgressCard.svelte';

  let stepIndex = $state(0);
  let totalTasks = $state(0);

  let userPrompt = $state('');
  let cards: HTMLDivElement[] = $state([]);
  let response: Response | undefined = $state();

  const completedTasks = $derived(sum(response?.steps.map(step => step.completions).flat()))

  async function fetchResponse() {
    const result = (await getResponse(userPrompt));
    response = result.response;
    totalTasks = result.totalTasks;
  }

  onMount(() => {
    fetchResponse();
  });

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

<p>What's your next plan?</p>

<input bind:value={userPrompt} class="input input-bordered w-full" placeholder="Type here" type="text" />

<button class="w-full max-w-2xl m-auto btn rounded-3xl flex gap-4" id="generate" onclick={fetchResponse}>
  <i class="fa-solid fa-wand-magic-sparkles"></i>
  Generate
</button>

{#if response}
  {@const { info, steps } = response}
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-2">
      <h1 class="text-3xl font-bold">{info.title}</h1>
      <span class="badge badge-info p-3"><span class="text-xl pr-1 pb-1">{info.icon}</span>{info.category}</span>
    </div>

    <div class="w-full overflow-scroll snap-x snap-mandatory scroll-auto no-scrollbar">
      <section class="flex gap-36 justify-between w-fit">
        {#each steps as step, i}
          <div bind:this={cards[i]} data-index={i} class="result-card">
            <ResultCard step={step} moneyUnit={info.moneyUnit} />
          </div>
        {/each}
      </section>
    </div>

    <ul class="steps">
      {#each steps as step, index}
        <li
          data-content={step.icon}
          class="step"
          class:step-info={stepIndex === index}
          class:text-primary={stepIndex === index}>
          {step.title}
        </li>
      {/each}
    </ul>
  </div>

  <div class="divider"></div>

  <ProgressCard total={totalTasks} current={completedTasks} />
{/if}

<!-- TODO: Need better style automatically fit to theme -->
<!-- Using CSS for easily inspection. Convert to tailwind later -->
<style lang="postcss">
  #generate {
    border: 1px solid rgba(150, 92, 201, .342);
    background: rgba(0, 0, 0, .22);
  }

  #generate:hover {
    color: #ffffff;
    background: transparent;
    box-shadow: 0 0 5px #ffffff77, -5px 0 20px rgba(255, 0, 255, .7), 5px 0 20px rgba(0, 255, 255, .7);
  }
</style>