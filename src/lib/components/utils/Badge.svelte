<script lang="ts">
  import invert from 'invert-color';
  import { cn } from '$lib/utils';
  import { colorLabel } from '$lib/utils';

  interface Props {
    icon: string;
    category: string;
    class?: string;
  }

  const { icon, category, class: classNames = '' }: Props = $props();

  const bgColor = colorLabel(category);
  const textColor = invert(bgColor, true); // true to return black/white
</script>
<span class={cn("badge p-3 py-4", classNames)} style="background-color: {bgColor}; color: {textColor}">
  <span class="text-xl pr-1 pb-1">{icon}</span>{category}
</span>
