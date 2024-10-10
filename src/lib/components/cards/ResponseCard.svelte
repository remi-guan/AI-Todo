<script lang="ts">
  import { onMount } from 'svelte';
  import { on } from 'svelte/events';
  import MarkdownIt from 'markdown-it';
  import InfoBadge from '$lib/components/utils/InfoBadge.svelte';
  import axios from 'axios';
  import type { StepWithRelations } from '$lib/database/response';

  let tasks: HTMLDivElement;
  const md = new MarkdownIt();

  interface Props {
    step: StepWithRelations;
    moneyUnit: string;
  }

  let { step, moneyUnit }: Props = $props();
  const { title, icon, timeCost, moneyCost, details } = step;

  let html = md.render(details);

  onMount(() => {
    // Can only control syntax with querySelector due to its generated HTML
    const listItems = tasks.querySelectorAll('li');
    listItems.forEach((li, index) => {
      const count = document.createElement('span');
      count.className = 'text-info pr-1.5';
      count.innerText = `${index + 1}. `;

      const text = document.createElement('span');
      text.innerText = li.innerText;

      function markAsCompleted() {
        text.classList.toggle('line-through'); // Toggle line-through on span
        li.classList.toggle('opacity-50');
      }

      li.className = 'my-3 p-2 bg-base-200 rounded-lg transition-all cursor-pointer';
      li.innerHTML = '';
      li.appendChild(count);
      li.appendChild(text);

      if (step.completions[index].value) {
        markAsCompleted();
      }

      on(li, 'click', () => {
        markAsCompleted();
        const completions = step.completions;
        completions[index].value = Number(!completions[index].value);

        // Reassign to trigger the update
        step.completions = [...completions];

        // Update new completions status to the database
        axios.put(`/api/response/step/${step.id}/completions`, completions);
      });
    });
  });
</script>

<div class="card bg-base-100 w-[88vw] lg:w-[60vw] snap-always snap-center h-fit">
  <div class="card-body p-6">
    <h2 class="card-title">
      {title} {icon}
    </h2>
    <p>
      <InfoBadge prefix="🕙" unit="m" variable={timeCost} />
      <InfoBadge prefix="💰" unit={moneyUnit} variable={moneyCost} />
    </p>
    <div bind:this={tasks} class="space-y-4">
      {@html html}
    </div>
  </div>
</div>
