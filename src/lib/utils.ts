import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function parseMarkdownLists(markdown: string) {
  return [...markdown.matchAll(/\d\..*/g)];
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
