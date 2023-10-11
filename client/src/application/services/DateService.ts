/* eslint-disable import/no-duplicates */
import { format } from 'date-fns';
import { enGB, pl, uk } from 'date-fns/locale';
import { klatinoid } from '@juliakramr/latynka';

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
  [LANG.en]: enGB,
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

  public previewServerDate(date: string, config?: Config): string {
    const currentConfig = this.mergeConfig(config);
    const result = format(new Date(date), 'dd MMMM, yyyy', {
      locale: langMap[currentConfig.lang],
    });
    if (currentConfig.lang === LANG.uk) {
      return klatinoid.cyrToLat(result);
    }
    return result;
  }
}

export const dateService = new DateService();
