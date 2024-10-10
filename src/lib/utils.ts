import { clsx } from 'clsx';
import { on } from 'svelte/events';
import { twMerge } from 'tailwind-merge';
import { locale } from 'svelte-i18n';
import type { ResponseWithRelations } from '$lib/schemas';

// Utility function to merge Tailwind classes with clsx
export function cn(...inputs: (string | boolean | undefined)[]): string {
  return twMerge(clsx(inputs));
}

// Parses ordered Markdown lists and returns matches
export function getMarkdownListCount(markdown: string): number {
  return [...markdown.matchAll(/\d\.\s.*/g)].length;
}

// Scrolls the provided element into view and waits until scrolling is completed
export function scrollIntoViewAndWait(element: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    // Edge case for no need to scroll
    if (Math.abs(element.getBoundingClientRect().top - 80) < 50) {
      resolve();
      return;
    }
    const handleScrollEnd = () => {
      resolve();
      off();
    };

    const off = on(document, 'scrollend', handleScrollEnd, { once: true });
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

export function preventDefault(fn) {
  return function (event) {
    event.preventDefault();
    fn.call(this, event);
  };
}

export function stopPropagation(fn) {
  return function (event) {
    event.stopPropagation();
    fn.call(this, event);
  };
}

// Calculates the total number of tasks from response steps and updates completion status
export function getTotalTasks(response: ResponseWithRelations): number {
  return response.steps.reduce((totalTasks, step) => {
    const tasksCount = getMarkdownListCount(step.details);
    return totalTasks + tasksCount;
  }, 0);
}

export function setLocale(lang: string) {
  // Functional programming to simplify call
  return () => {
    // preserve for next time page reload
    window.location.hash = `lang=${lang}`;
    locale.set(lang);
  };
}

export function colorLabel(label: string) {
  const colors: string[] = [
    '#FFB3C1', // Soft Pink
    '#FFDDC1', // Light Peach
    '#C7EFCF', // Mint Green
    '#B2DFDB', // Light Teal
    '#AEDFF7', // Soft Blue
    '#D1C4E9', // Lavender
    '#F8BBD0', // Light Rose
    '#F3E5F5', // Soft Lilac
    '#B2EBF2', // Soft Cyan
    '#FFCCBC', // Light Coral
    '#E0F2F1', // Soft Aqua
    '#FFE082', // Light Gold
    '#D7CCC8', // Light Brown
    '#C5CAE9', // Soft Indigo
    '#E1F5FE' // Soft Sky Blue
  ];
  // Convert string to a numeric hash
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Use mod to select color index from softColors array
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
