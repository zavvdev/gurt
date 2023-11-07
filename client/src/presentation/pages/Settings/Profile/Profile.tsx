import { Button } from 'antd';
import cn from 'clsx';
import { useUpdateProfile } from '~/application/features/sessionUser/updateData';
import { notificationService } from '~/application/services/NotificationService';
import { getFirstExtractedValidationErrorEntry } from '~/application/utilities/general';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingsPageLayout } from '~/presentation/pages/Settings/layouts/SettingsPageLayout/SettingsPageLayout';
import { useProfileStyles } from '~/presentation/pages/Settings/Profile/Profile.styles';
import { Icons } from '~/presentation/assets/Icons';
import { useForm } from '~/presentation/pages/Settings/Profile/hooks/useForm';
import { useInitialValues } from '~/presentation/pages/Settings/Profile/hooks/useInitialValues';
import { Bio } from '~/presentation/pages/Settings/Profile/shared/Bio/Bio';
import { Country } from '~/presentation/pages/Settings/Profile/shared/Country/Country';
import { DateOfBirth } from '~/presentation/pages/Settings/Profile/shared/DateOfBirth/DateOfBirth';

export function Profile() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('settings');
  const classes = useProfileStyles();
  const initialValues = useInitialValues();

  const updateProfile = useUpdateProfile({
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
    onSubmit: updateProfile.initiate,
  });

  return (
    <SettingsPageLayout label={t('profile.label')} className={classes.content}>
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
          loading={updateProfile.isLoading}
          disabled={
            initialValues.isLoading || !form.dirty || updateProfile.isLoading
          }
        >
          {tCommon('label.save')}
        </Button>
        <Button
          size="large"
          onClick={() => form.resetForm()}
          disabled={
            initialValues.isLoading || !form.dirty || updateProfile.isLoading
          }
        >
          {tCommon('label.reset')}
        </Button>
      </div>
    </SettingsPageLayout>
  );
}
