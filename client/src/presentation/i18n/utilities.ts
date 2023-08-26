import { FALLBACK_LNG, LANGUAGES } from '~/presentation/i18n/config';

export function getOptions(lng = FALLBACK_LNG, ns = 'common') {
  return {
    supportedLngs: Object.values(LANGUAGES),
    fallbackLng: FALLBACK_LNG,
    lng,
    fallbackNS: 'common',
    defaultNS: 'common',
    ns,
  };
}
