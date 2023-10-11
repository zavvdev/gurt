import cn from 'clsx';
import i18next from 'i18next';
import { dateService } from '~/application/services/DateService';
import { Icons } from '~/presentation/assets/Icons';
import { useAdditionInfoStyles } from '~/presentation/pages/Profile/shared/AdditionInfo/AdditionInfo.styles';

interface Props {
  country: string | null;
  city: string | null;
  dateOfBirth: string | null;
  className?: string;
}

export function AdditionInfo({ country, city, dateOfBirth, className }: Props) {
  const classes = useAdditionInfoStyles();

  return (
    <div className={cn(classes.root, className)}>
      {(country || city) && (
        <div className={classes.row}>
          <Icons.MapPin height={18} />
          {[country, city].join(', ')}
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
