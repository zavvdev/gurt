import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

export const METADATA: Metadata = {
  title: 'Gurt',
  description: 'Ukrainian social network',
};

export const FONT = Montserrat({ subsets: ['latin', 'cyrillic-ext'] });
