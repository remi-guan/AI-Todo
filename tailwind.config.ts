import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      animation: {
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear'
      },
      keyframes: {
        'border-beam': {
          '100%': {
            'offset-distance': '100%'
          }
        }
      }
    }
  },

  plugins: [typography, daisyui]
} as Config;
