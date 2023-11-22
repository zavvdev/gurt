import { Button } from 'antd';
import cn from 'clsx';
import { notificationService } from '~/application/services/NotificationService';
import { getFirstExtractedValidationErrorEntry } from '~/application/utilities/general';
import { useProfileSettings } from '~/application/features/settings/profile/useProfileSettings';
import { useUpdateProfileSettings } from '~/application/features/settings/profile/useUpdateProfileSettings';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingsPageLayout } from '~/presentation/pages/Settings/layouts/SettingsPageLayout/SettingsPageLayout';
import { useProfileStyles } from '~/presentation/pages/Settings/pages/Profile/Profile.styles';
import { Icons } from '~/presentation/assets/Icons';
import { useForm } from '~/presentation/pages/Settings/pages/Profile/hooks/useForm';
import { Bio } from '~/presentation/pages/Settings/pages/Profile/shared/Bio/Bio';
import { Country } from '~/presentation/pages/Settings/pages/Profile/shared/Country/Country';
import { DateOfBirth } from '~/presentation/pages/Settings/pages/Profile/shared/DateOfBirth/DateOfBirth';
import { Name } from '~/presentation/pages/Settings/pages/Profile/shared/Name/Name';
import { Username } from '~/presentation/pages/Settings/pages/Profile/shared/Username/Username';
import { Image } from '~/presentation/pages/Settings/pages/Profile/shared/Image/Image';
import { Background } from '~/presentation/pages/Settings/pages/Profile/shared/Background/Background';

export function Profile() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('settings');
  const classes = useProfileStyles();

  const initialValues = useProfileSettings({
    onError: () => {
      notificationService.error(t('error.fetchUser'));
    },
  });

  const updateData = useUpdateProfileSettings({
    onSuccess: () => {
      initialValues.refetch();
      notificationService.success(t('profile.update.success.fallback'));
    },
    onError: (validationErrors) => {
      const { field, key } =
        getFirstExtractedValidationErrorEntry(validationErrors);

      notificationService.error(
        t([
          `profile.update.error.serverValidation.${field}.${key}`,
          'profile.update.error.fallback',
        ]),
      );
    },
  });

  const form = useForm({
    initialValues: initialValues.data,
    onSubmit: updateData.initiate,
  });

  return (
    <SettingsPageLayout label={t('profile.label')} className={classes.content}>
      <div className={cn(classes.row, classes.images)}>
        <Image
          isLoading={initialValues.isLoading}
          fileUrl={form.values.imageUrl}
          onSelect={(nextImage) => form.setFieldValue('imageUrl', nextImage)}
        />
        <Background
          isLoading={initialValues.isLoading}
          fileUrl={form.values.backgroundImageUrl}
          onSelect={(nextBackground) =>
            form.setFieldValue('backgroundImageUrl', nextBackground)
          }
        />
      </div>
      <div className={classes.row}>
        <Name
          value={form.values.name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.getError('name')}
          isLoading={initialValues.isLoading}
        />
        <Username
          value={form.values.username}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.getError('username')}
          isLoading={initialValues.isLoading}
        />
      </div>
      <Bio
        value={form.values.bio}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.getError('bio')}
        isLoading={initialValues.isLoading}
      />
      <div className={classes.row}>
        <Country
          value={form.values.country}
          onChange={(nextCountry) =>
            form.setFieldValue('country', nextCountry || null)
          }
          onBlur={() => form.setFieldTouched('country')}
          isLoading={initialValues.isLoading}
        />
        <DateOfBirth
          value={form.values.dateOfBirth}
          onChange={(nextDate) =>
            form.setFieldValue('dateOfBirth', nextDate || null)
          }
          onBlur={() => form.setFieldTouched('dateOfBirth')}
          error={form.getError('dateOfBirth')}
          isLoading={initialValues.isLoading}
        />
      </div>
      <div className={cn(classes.row, classes.footer)}>
        <Button
          type="primary"
          size="large"
          icon={<Icons.Save width={17} />}
          onClick={() => form.handleSubmit()}
          loading={updateData.isLoading}
          disabled={
            initialValues.isLoading || !form.dirty || updateData.isLoading
          }
        >
          {tCommon('label.save')}
        </Button>
        <Button
          size="large"
          onClick={() => form.resetForm()}
          disabled={
            initialValues.isLoading || !form.dirty || updateData.isLoading
          }
        >
          {tCommon('label.reset')}
        </Button>
      </div>
    </SettingsPageLayout>
  );
}
