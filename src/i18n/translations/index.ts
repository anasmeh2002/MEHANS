import { en } from './en';
import { fr } from './fr';
import { ar } from './ar';

export const translations = {
  en,
  fr,
  ar,
} as const;

export type Language = keyof typeof translations;
export type Translation = typeof en;

export { en, fr, ar };
