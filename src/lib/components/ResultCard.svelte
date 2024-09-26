<script lang="ts">
  import { onMount } from 'svelte';
  import MarkdownIt from 'markdown-it';
  import type { Step } from '$lib/schemas';
  import InfoBadge from '$lib/components/InfoBadge.svelte';

  let tasks: HTMLDivElement;
  const md = new MarkdownIt();

  let { title, icon, timeCost, moneyCost, details, suggestionAdjustA, suggestionAdjustB }: Step = $props();
  let html = md.render(details);

  onMount(() => {
    const listItems = tasks.querySelectorAll('li');
    listItems.forEach((li, index) => {
      const count = document.createElement('span');
      count.className = "text-primary pr-1.5";
      count.innerText = `${index + 1}. `;

      const text = document.createElement('span');
      text.innerText = li.innerText;

      li.className = "my-3 p-2 bg-base-200 rounded-lg transition-all";
      li.innerHTML = '';
      li.appendChild(count);
      li.appendChild(text);

      li.addEventListener('click', () => {
        text.classList.toggle('line-through'); // Toggle line-through on span
        li.classList.toggle('opacity-50');
      });
    });
  });
</script>

<div class="card bg-base-100 w-[60vw] shadow-xl snap-always snap-center h-fit">
  <figure>
<!--    <img-->
<!--      alt="Shoes"-->
<!--      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" />-->
  </figure>
  <div class="card-body">
    <h2 class="card-title">
      {title} {icon}
    </h2>
    <p>
      <InfoBadge prefix="🕙" unit="m" variable={timeCost} />
      <InfoBadge prefix="💰" unit="$" variable={moneyCost} />
    </p>
    <div bind:this={tasks} class="space-y-4">
      {@html html}
    </div>
  </div>
</div>
