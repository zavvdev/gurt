import { DatePicker as AntDatePicker, DatePickerProps } from 'antd';
import { FALLBACK_LNG } from '~/presentation/i18n/config';
import { SHORT_MONTHS, SHORT_WEEK_DAYS } from '~/presentation/i18n/dates';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';

export function DatePicker(props: Omit<DatePickerProps, 'locale'>) {
  const { i18n, t } = useTranslation('common');

  return (
    <AntDatePicker
      {...props}
      locale={{
        lang: {
          locale: i18n.language,
          placeholder: t('label.selectDate'),
          rangePlaceholder: [t('label.startDate'), t('label.endDate')],
          today: t('label.today'),
          now: t('label.now'),
          backToToday: t('label.backToToday'),
          ok: t('label.ok'),
          clear: t('label.clear'),
          month: t('label.month'),
          year: t('label.year'),
          timeSelect: t('label.selectTime'),
          dateSelect: t('label.selectDate'),
          monthSelect: t('label.chooseMonth'),
          yearSelect: t('label.chooseYear'),
          decadeSelect: t('label.chooseDecade'),
          yearFormat: 'YYYY',
          dateFormat: 'M/D/YYYY',
          dayFormat: 'D',
          dateTimeFormat: 'M/D/YYYY HH:mm:ss',
          monthBeforeYear: true,
          previousMonth: t('label.prevMonth'),
          nextMonth: t('label.nextMonth'),
          previousYear: t('label.prevYear'),
          nextYear: t('label.nextYear'),
          previousDecade: t('label.prevDecade'),
          nextDecade: t('label.nextDecade'),
          previousCentury: t('label.prevCentury'),
          nextCentury: t('label.nextCentury'),
          shortWeekDays:
            SHORT_WEEK_DAYS?.[i18n.language] || SHORT_WEEK_DAYS[FALLBACK_LNG],
          shortMonths:
            SHORT_MONTHS?.[i18n.language] || SHORT_MONTHS[FALLBACK_LNG],
        },
        timePickerLocale: {
          placeholder: t('label.selectTime'),
        },
        dateFormat: 'YYYY-MM-DD',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        weekFormat: 'YYYY-wo',
        monthFormat: 'YYYY-MM',
      }}
    />
  );
}
