import dayjs, { extend } from 'dayjs';
import pl from 'dayjs/locale/pl';
import uk from 'dayjs/locale/uk';
import en from 'dayjs/locale/en';
import { klatinoid } from '@juliakramr/latynka';
import dayJsDuration from 'dayjs/plugin/duration';
import { SERVER_DATE_FORMAT } from '~/infrastructure/serverGateway/config';

extend(dayJsDuration);

const LANG = {
  en: 'en',
  uk: 'uk',
  pl: 'pl',
};

interface Config {
  lang: string;
}

interface Args {
  config?: Partial<Config>;
}

const defaultConfig: Config = {
  lang: LANG.en,
};

const langMap = {
  [LANG.en]: en,
  [LANG.pl]: pl,
  [LANG.uk]: uk,
};

class DateService {
  private config: Config;

  constructor(args?: Args) {
    this.config = {
      ...defaultConfig,
      ...args?.config,
    };
  }

  private mergeConfig(config?: Partial<Config>): Config {
    return {
      ...this.config,
      ...config,
    };
  }

  public previewServerDate(
    date: string,
    config?: Config,
    format: string = 'D MMMM, YYYY',
  ): string {
    const currentConfig = this.mergeConfig(config);

    const result = dayjs(date)
      .locale(langMap[currentConfig.lang])
      .format(format);

    if (currentConfig.lang === LANG.uk) {
      return klatinoid.cyrToLat(result);
    }

    return result;
  }

  public toServerDate(date: string | Date) {
    return dayjs(new Date(date)).format(SERVER_DATE_FORMAT);
  }

  public isValidDateOfBirth(date: string | Date) {
    const start = dayjs(new Date(date));
    const end = dayjs();
    const duration = dayjs.duration(end.diff(start));
    return duration.years() >= 14;
  }
}

export const dateService = new DateService();
