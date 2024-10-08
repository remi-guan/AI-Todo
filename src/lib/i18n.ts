import { init, register, getLocaleFromNavigator, getLocaleFromHash } from 'svelte-i18n';

const defaultLocale = 'en';

register('en', () => import('./locales/en.json'));
register('zh', () => import('./locales/zh.json'));

init({
  fallbackLocale: defaultLocale,
  initialLocale: getLocaleFromHash('lang') || getLocaleFromNavigator()
});