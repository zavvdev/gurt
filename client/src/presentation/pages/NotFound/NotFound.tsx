import { Typography } from 'antd';
import { useTranslation } from '~/presentation/i18n/useTranslation';
import { Icons } from '~/presentation/shared/Icons';

export function NotFound() {
  const { t } = useTranslation('common');

  return (
    <section className="flex justify-center items-center h-screen flex-col gap-8 max-md:gap-2">
      <Icons.Logo className="text-gray-300 max-md:w-12" />
      <Typography.Text type="secondary" className="text-6xl  max-md:text-2xl">
        {t('notFoundPage.label')}
      </Typography.Text>
    </section>
  );
}
