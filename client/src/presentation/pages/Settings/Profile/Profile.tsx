import { Button, Input, Select, Typography } from 'antd';
import cn from 'clsx';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { SettingsPageLayout } from '~/presentation/pages/Settings/layouts/SettingsPageLayout/SettingsPageLayout';
import { Image } from '~/presentation/pages/Settings/Profile/shared/Image/Image';
import { Background } from '~/presentation/pages/Settings/Profile/shared/Background/Background';
import { useProfileStyles } from '~/presentation/pages/Settings/Profile/Profile.styles';
import { SettingItem } from '~/presentation/pages/Settings/shared/SettingItem/SettingItem';
import { Icons } from '~/presentation/assets/Icons';
import { useJssTheme } from '~/presentation/styles/hooks/useJssTheme';
import { COUNTRIES } from '~/presentation/i18n/countries';
import { DatePicker } from '~/presentation/shared/DatePicker/DatePicker';
import { useForm } from '~/presentation/pages/Settings/Profile/hooks/useForm';
import { useInitialValues } from '~/presentation/pages/Settings/Profile/hooks/useInitialValues';

export function Profile() {
  const { i18n, t: tCommon } = useTranslation('common');
  const { t } = useTranslation('settings');
  const classes = useProfileStyles();
  const { theme } = useJssTheme();
  const { initialValues } = useInitialValues();

  const form = useForm({
    initialValues,
    onSubmit: console.log,
  });

  return (
    <SettingsPageLayout label={t('profile.label')} className={classes.content}>
      <div className={cn(classes.row, classes.images)}>
        <Image
          file={form.values.image}
          onSelect={(nextImage) => form.setFieldValue('image', nextImage)}
        />
        <Background
          file={form.values.backgroundImage}
          onSelect={(nextBackground) =>
            form.setFieldValue('backgroundImage', nextBackground)
          }
        />
      </div>
      <div className={classes.row}>
        <SettingItem dir="col" label={tCommon('label.name')}>
          <Input
            size="large"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            status={form.getError('name') ? 'error' : undefined}
          />
          {Boolean(form.getError('name')) && (
            <Typography.Text type="danger">
              {form.getError('name')}
            </Typography.Text>
          )}
        </SettingItem>
        <SettingItem dir="col" label={tCommon('label.username')}>
          <Input
            size="large"
            name="username"
            value={form.values.username}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            status={form.getError('username') ? 'error' : undefined}
            prefix={<Icons.AtSign width={17} color={theme.color.gray6} />}
          />
          {Boolean(form.getError('username')) && (
            <Typography.Text type="danger">
              {form.getError('username')}
            </Typography.Text>
          )}
        </SettingItem>
      </div>
      <SettingItem dir="col" label={tCommon('label.bio')}>
        <TextArea
          size="large"
          name="bio"
          value={form.values.bio || ''}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          autoSize={{ minRows: 3, maxRows: 5 }}
          status={form.getError('bio') ? 'error' : undefined}
        />
        {Boolean(form.getError('bio')) && (
          <Typography.Text type="danger">
            {form.getError('bio')}
          </Typography.Text>
        )}
      </SettingItem>
      <div className={classes.row}>
        <SettingItem dir="col" label={tCommon('label.country')}>
          <Select
            allowClear
            showSearch
            size="large"
            optionFilterProp="children"
            placeholder={t('profile.country.placeholder')}
            value={form.values.country}
            onChange={(nextCountry) =>
              form.setFieldValue('country', nextCountry)
            }
            onBlur={() => form.setFieldTouched('country')}
            options={COUNTRIES.map((c) => ({
              value: c.code,
              label: c.name?.[i18n.language] || '',
            }))}
            filterOption={(input, option) =>
              (option?.label?.toLowerCase() ?? '').includes(input.toLowerCase())
            }
          />
        </SettingItem>
        <SettingItem dir="col" label={tCommon('label.dateOfBirth')}>
          <DatePicker
            allowClear
            size="large"
            value={
              form.values.dateOfBirth
                ? dayjs(form.values.dateOfBirth)
                : undefined
            }
            onChange={(d) =>
              form.setFieldValue('dateOfBirth', d ? d?.toDate() : null)
            }
            onBlur={() => form.setFieldTouched('dateOfBirth')}
            format="DD/MM/YYYY"
          />
          {Boolean(form.getError('dateOfBirth')) && (
            <Typography.Text type="danger">
              {form.getError('dateOfBirth')}
            </Typography.Text>
          )}
        </SettingItem>
      </div>
      <div className={cn(classes.row, classes.footer)}>
        <Button
          type="primary"
          size="large"
          icon={<Icons.Save width={17} />}
          onClick={() => form.handleSubmit()}
        >
          {tCommon('label.save')}
        </Button>
        <Button size="large" onClick={() => form.resetForm()}>
          {tCommon('label.reset')}
        </Button>
      </div>
    </SettingsPageLayout>
  );
}
