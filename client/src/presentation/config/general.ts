import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

export const METADATA: Metadata = {
  title: 'Gurt',
  description: 'Ukrainian social network',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export const FONT = Montserrat({ subsets: ['latin', 'cyrillic-ext'] });
