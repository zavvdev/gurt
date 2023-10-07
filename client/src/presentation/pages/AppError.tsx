import { CSSProperties } from 'react';
import { Trans } from 'react-i18next';
import { useTranslation } from '~/presentation/i18n/hooks/useTranslation';
import { Icons } from '~/presentation/assets/Icons';

const rootStyles: CSSProperties = {
  filter: 'invert(1)',
  mixBlendMode: 'difference',
  padding: '2rem 5%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',
};

const iconStyles: CSSProperties = {
  width: '7rem',
  height: 'auto',
};

const labelStyles: CSSProperties = {
  marginTop: '0.7rem',
  fontSize: '2.5rem',
  fontWeight: 'bold',
};

const textStyles: CSSProperties = {
  maxWidth: '28rem',
};

const linkStyles: CSSProperties = {
  textDecoration: 'underline',
};

export function AppError() {
  const { t } = useTranslation('common');

  return (
    <div style={rootStyles}>
      <Icons.ServerCrash style={iconStyles} />
      <h1 style={labelStyles}>{t('appError.label')}</h1>
      <div style={textStyles}>
        <Trans
          i18nKey={t('appError.description', {
            contact: t('contact.authorUrl'),
            interpolation: {
              escapeValue: false,
            },
          })}
          components={{
            a: (
              <a
                style={linkStyles}
                target="_blank"
                href={t('contact.authorUrl')}
              />
            ),
          }}
        />
      </div>
    </div>
  );
}
