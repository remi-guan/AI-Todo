<script lang="ts">
  import ResultCard from '$lib/components/ResultCard.svelte';
  import { getResponse } from '$lib/get-response';
  import type { Info, Step } from '$lib/schemas';
  import { onMount } from 'svelte';

  let stepIndex = $state(0);
  let userPrompt = $state('');

  let info: Info | undefined = $state();
  let steps: Step[] = $state([]);

  function fetchResponse() {
    const response = getResponse(userPrompt);
    info = response.info;
    steps = response.steps;
  }

  onMount(() => {
    fetchResponse();

    const options = {
      root: null,
      threshold: 0.5 // Trigger when 50% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = steps.findIndex(step => step.title === entry.target.id);
          if (index !== -1) {
            stepIndex = index; // Update the stepIndex based on the visible card
          }
        }
      });
    }, options);

    // Observe each ResultCard
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => observer.observe(card));
  });
</script>

<p>Let's try ask for something!</p>

<input bind:value={userPrompt} class="input input-bordered w-full" placeholder="Type here" type="text" />

<button class="w-full btn btn-primary rounded-3xl" onclick={fetchResponse}>
  Generate
</button>

<div class="flex flex-col gap-6">
  <ul class="steps">
    {#each steps as step, index}
      <li data-content={step.icon} class="step" class:step-info={stepIndex === index}>
        {step.title}
      </li>
    {/each}
  </ul>

  <div class="w-full overflow-scroll snap-x snap-mandatory scroll-auto no-scrollbar">
    <section class="flex gap-36 justify-between w-fit">
      {#each steps as step}
        <ResultCard {...step} />
      {/each}
    </section>
  </div>
</div>
