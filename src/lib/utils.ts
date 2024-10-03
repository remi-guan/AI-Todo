import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function parseMarkdownLists(markdown: string) {
  return [...markdown.matchAll(/\d\..*/g)];
}

export function scrollIntoViewAndWait(element) {
  return new Promise((resolve) => {
    // edge case for no need to scroll, trigger when click on the different steps multiple times
    if (Math.abs(element.getBoundingClientRect().top - 80) < 50) {
      resolve();
    }
    document.addEventListener('scrollend', resolve, { once: true });
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}