import { FlatNamespace, KeyPrefix } from 'i18next';
import {
  FallbackNs,
  UseTranslationOptions,
  useTranslation as useTranslationOrg,
} from 'react-i18next';
import { Namespace } from '~/presentation/i18n/config';

export function useTranslation<
  Ns extends FlatNamespace | undefined = undefined,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(ns: Namespace, options?: UseTranslationOptions<KPrefix>) {
  return useTranslationOrg(ns, options);
}
