export type Language = 'en' | 'bn';

// DeepPartial utility to allow nested optional overrides
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};

let currentLanguage: Language = (localStorage.getItem('lang') as Language) || 'en';

type LangListener = (lang: Language) => void;
const listeners: LangListener[] = [];

export const getLanguage = (): Language => currentLanguage;

export const setLanguage = (lang: Language) => {
  if (lang === currentLanguage) return;
  currentLanguage = lang;
  localStorage.setItem('lang', lang);
  // Update document language attribute for SEO/accessibility
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
  }
  listeners.forEach((cb) => cb(currentLanguage));
};

export const subscribeLanguage = (cb: LangListener) => {
  listeners.push(cb);
  return () => {
    const idx = listeners.indexOf(cb);
    if (idx >= 0) listeners.splice(idx, 1);
  };
};

import type { SiteContent } from '@/utils/contentManager';
import { bnOverrides } from './bn';

// set initial document lang on load
if (typeof document !== 'undefined') {
  document.documentElement.lang = currentLanguage === 'bn' ? 'bn' : 'en';
}

export const getLocalizedContent = (content: SiteContent): SiteContent => {
  if (currentLanguage !== 'bn') return content;
  // Deep merge bn overrides over base content
  const merge = (base: any, override: any): any => {
    if (override === undefined) return base;
    if (Array.isArray(base)) return override ?? base;
    if (typeof base === 'object' && base && typeof override === 'object' && override) {
      const out: any = { ...base };
      for (const key of Object.keys(override)) {
        out[key] = merge(base?.[key], override[key]);
      }
      return out;
    }
    return override ?? base;
  };
  return merge(content, bnOverrides as DeepPartial<SiteContent>);
};
