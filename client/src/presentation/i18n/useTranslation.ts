'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import i18next, { FlatNamespace, KeyPrefix } from 'i18next';
import {
  FallbackNs,
  UseTranslationOptions,
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getOptions } from '~/presentation/i18n/utilities';
import { LANGUAGES } from '~/presentation/i18n/config';
import { Namespace } from '~/presentation/i18n/types';

const isServer = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: isServer ? Object.values(LANGUAGES) : [],
  });

export function useTranslation<
  Ns extends FlatNamespace | undefined = undefined,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(ns: Namespace, options?: UseTranslationOptions<KPrefix>) {
  const translation = useTranslationOrg(ns, options);
  const params = useParams();

  const { i18n } = translation;

  if (isServer && params.lng && i18n.resolvedLanguage !== params.lng) {
    i18n.changeLanguage(params.lng as string);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!params.lng || i18n.resolvedLanguage === params.lng) return;
      i18n.changeLanguage(params.lng as string);
    }, [params.lng, i18n]);
  }

  return translation;
}
