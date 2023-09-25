/* eslint-disable react-refresh/only-export-components */
import '~/presentation/styles/globals.css';
import type { Metadata } from 'next';
import { RootLayout } from '~/presentation/layouts/Root/RootLayout';
import { LANGUAGES } from '~/presentation/i18n/config';
import { useServerTranslation } from '~/presentation/i18n/useServerTranslation';

export async function generateStaticParams() {
  return Object.values(LANGUAGES).map((lng) => ({ lng }));
}

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: string };
}): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useServerTranslation(lng, 'common');
  return {
    title: t('meta.appName'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
  };
}

export default RootLayout;
