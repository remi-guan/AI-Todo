import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Response } from '@prisma/client';

// Utility function to merge Tailwind classes with clsx
export function cn(...inputs: (string | boolean | undefined)[]): string {
  return twMerge(clsx(inputs));
}

// Parses ordered Markdown lists and returns matches
export function parseMarkdownLists(markdown: string): RegExpMatchArray[] {
  return [...markdown.matchAll(/\d\.\s.*/g)];
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
      document.removeEventListener('scrollend', handleScrollEnd);
    };

    document.addEventListener('scrollend', handleScrollEnd, { once: true });
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// Calculates the total number of tasks from response steps and updates completion status
export function getTotalTasks(response: Response): number {
  console.log(response);
  return response.steps.reduce((totalTasks, step) => {
    const tasksCount = parseMarkdownLists(step.details).length;
    step.completions = Array(tasksCount).fill(false);
    return totalTasks + tasksCount;
  }, 0);
}