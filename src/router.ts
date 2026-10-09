export type ServiceSlug = 'real-estate-crm' | 'ai-lead-qualification' | 'whatsapp-automation' | 'lead-capture-automation';

export const serviceSlugs: ServiceSlug[] = [
  'real-estate-crm',
  'ai-lead-qualification',
  'whatsapp-automation',
  'lead-capture-automation',
];

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return serviceSlugs.includes(slug as ServiceSlug);
}

export function getServicePath(slug: ServiceSlug): string {
  return `/services/${slug}`;
}

export function getCurrentPath(): string {
  return window.location.pathname;
}

export function getInitialRoute(): string {
  const path = window.location.pathname;
  if (path === '/' || path === '') return '/';
  return path;
}

export function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0 });
}
