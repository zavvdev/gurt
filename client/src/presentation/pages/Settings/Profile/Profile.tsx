import { Button } from 'antd';
import cn from 'clsx';
import { usePatchProfile } from '~/application/features/user/patchProfile';
import { notificationService } from '~/application/services/NotificationService';
import { getFirstExtractedValidationErrorEntry } from '~/application/utilities/general';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingsPageLayout } from '~/presentation/pages/Settings/layouts/SettingsPageLayout/SettingsPageLayout';
import { Image } from '~/presentation/pages/Settings/Profile/shared/Image/Image';
import { Background } from '~/presentation/pages/Settings/Profile/shared/Background/Background';
import { useProfileStyles } from '~/presentation/pages/Settings/Profile/Profile.styles';
import { Icons } from '~/presentation/assets/Icons';
import { useForm } from '~/presentation/pages/Settings/Profile/hooks/useForm';
import { useInitialValues } from '~/presentation/pages/Settings/Profile/hooks/useInitialValues';
import { Name } from '~/presentation/pages/Settings/Profile/shared/Name/Name';
import { Username } from '~/presentation/pages/Settings/Profile/shared/Username/Username';
import { Bio } from '~/presentation/pages/Settings/Profile/shared/Bio/Bio';
import { Country } from '~/presentation/pages/Settings/Profile/shared/Country/Country';
import { DateOfBirth } from '~/presentation/pages/Settings/Profile/shared/DateOfBirth/DateOfBirth';

export function Profile() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('settings');
  const classes = useProfileStyles();
  const initialValues = useInitialValues();

  const patchProfile = usePatchProfile({
    onSuccess: () => {
      initialValues.refetch();
      notificationService.success(t('profile.patch.success.fallback'));
    },
    onError: (validationErrors) => {
      const { field, key } =
        getFirstExtractedValidationErrorEntry(validationErrors);

      notificationService.error(
        t([
          `profile.patch.error.serverValidation.${field}.${key}`,
          'profile.patch.error.fallback',
        ]),
      );
    },
  });

  const form = useForm({
    initialValues: initialValues.data,
    onSubmit: patchProfile.initiate,
  });

  return (
    <SettingsPageLayout label={t('profile.label')} className={classes.content}>
      <div className={cn(classes.row, classes.images)}>
        <Image
          isLoading={initialValues.isLoading}
          file={form.values.image}
          onSelect={(nextImage) => form.setFieldValue('image', nextImage)}
        />
        <Background
          isLoading={initialValues.isLoading}
          file={form.values.backgroundImage}
          onSelect={(nextBackground) =>
            form.setFieldValue('backgroundImage', nextBackground)
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
          onChange={(nextCountry) => form.setFieldValue('country', nextCountry)}
          onBlur={() => form.setFieldTouched('country')}
          isLoading={initialValues.isLoading}
        />
        <DateOfBirth
          value={form.values.dateOfBirth}
          onChange={(nextDate) => form.setFieldValue('dateOfBirth', nextDate)}
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
          loading={patchProfile.isLoading}
          disabled={
            initialValues.isLoading || !form.dirty || patchProfile.isLoading
          }
        >
          {tCommon('label.save')}
        </Button>
        <Button
          size="large"
          onClick={() => form.resetForm()}
          disabled={
            initialValues.isLoading || !form.dirty || patchProfile.isLoading
          }
        >
          {tCommon('label.reset')}
        </Button>
      </div>
    </SettingsPageLayout>
  );
}
