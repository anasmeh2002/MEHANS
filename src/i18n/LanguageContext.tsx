import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations, Language, Translation } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'mehans_language';
const VALID_LANGS: Language[] = ['en', 'fr', 'ar'];

const localeMap: Record<Language, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  ar: 'ar_MA',
};

const ogLocaleAlternates: Record<Language, string[]> = {
  en: ['fr_FR', 'ar_MA'],
  fr: ['en_US', 'ar_MA'],
  ar: ['en_US', 'fr_FR'],
};

function getLangFromURL(): Language | null {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  if (lang && VALID_LANGS.includes(lang as Language)) {
    return lang as Language;
  }
  return null;
}

function getLangFromBrowser(): Language | null {
  const browser = navigator.language.slice(0, 2).toLowerCase();
  if (VALID_LANGS.includes(browser as Language)) {
    return browser as Language;
  }
  return null;
}

function updateURL(lang: Language) {
  const url = new URL(window.location.href);
  if (lang === 'en') {
    url.searchParams.delete('lang');
  } else {
    url.searchParams.set('lang', lang);
  }
  window.history.replaceState({}, '', url.toString());
}

function updateMetaTags(lang: Language, t: Translation) {
  const titleEl = document.querySelector('title');
  if (titleEl) titleEl.textContent = t.meta.title;

  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute('content', t.meta.description);

  const canonicalEl = document.querySelector('link[rel="canonical"]');
  const langParam = lang === 'en' ? '' : `?lang=${lang}`;
  if (canonicalEl) canonicalEl.setAttribute('href', `https://mehans.space/${langParam}`);

  const ogTitleEl = document.querySelector('meta[property="og:title"]');
  if (ogTitleEl) ogTitleEl.setAttribute('content', t.meta.title);

  const ogDescEl = document.querySelector('meta[property="og:description"]');
  if (ogDescEl) ogDescEl.setAttribute('content', t.meta.description);

  const ogUrlEl = document.querySelector('meta[property="og:url"]');
  if (ogUrlEl) ogUrlEl.setAttribute('content', `https://mehans.space/${langParam}`);

  const ogLocaleEl = document.querySelector('meta[property="og:locale"]');
  if (ogLocaleEl) ogLocaleEl.setAttribute('content', localeMap[lang]);

  const twTitleEl = document.querySelector('meta[name="twitter:title"]');
  if (twTitleEl) twTitleEl.setAttribute('content', t.meta.title);

  const twDescEl = document.querySelector('meta[name="twitter:description"]');
  if (twDescEl) twDescEl.setAttribute('content', t.meta.description);

  const altLinks = document.querySelectorAll('link[rel="alternate"][hreflang]');
  altLinks.forEach((link) => {
    const hreflang = link.getAttribute('hreflang');
    if (hreflang && VALID_LANGS.includes(hreflang as Language)) {
      const l = hreflang as Language;
      const param = l === 'en' ? '' : `?lang=${l}`;
      link.setAttribute('href', `https://mehans.space/${param}`);
    }
  });

  const ogAltLinks = document.querySelectorAll('meta[property="og:locale:alternate"]');
  const alts = ogLocaleAlternates[lang];
  ogAltLinks.forEach((el, i) => {
    if (i < alts.length) el.setAttribute('content', alts[i]);
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const urlLang = getLangFromURL();
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    const browserLang = getLangFromBrowser();

    const initial = urlLang || stored && VALID_LANGS.includes(stored) ? stored : browserLang || 'en';
    setLanguageState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    if (language === 'ar') {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }

    updateURL(language);
    updateMetaTags(language, translations[language]);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
