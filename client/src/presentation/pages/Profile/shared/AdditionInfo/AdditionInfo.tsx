import cn from 'clsx';
import i18next from 'i18next';
import { dateService } from '~/application/services/DateService';
import { Icons } from '~/presentation/assets/Icons';
import { getCountryNameByCode } from '~/presentation/i18n/countries';
import { useAdditionInfoStyles } from '~/presentation/pages/Profile/shared/AdditionInfo/AdditionInfo.styles';

interface Props {
  country: string | null;
  dateOfBirth: string | null;
  className?: string;
}

export function AdditionInfo({ country, dateOfBirth, className }: Props) {
  const classes = useAdditionInfoStyles();

  return (
    <div className={cn(classes.root, className)}>
      {country && (
        <div className={classes.row}>
          <Icons.MapPin height={18} />
          {getCountryNameByCode(country)}
        </div>
      )}
      {dateOfBirth && (
        <div className={classes.row}>
          <Icons.Cake height={18} />
          {dateService.previewServerDate(dateOfBirth, {
            lang: i18next.language,
          })}
        </div>
      )}
    </div>
  );
}
