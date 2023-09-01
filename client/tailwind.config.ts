import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/presentation/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        prm: '#1F81F8',
        prmLight: '#3791ff',
        prmFade: '#EBF4FF',
        prmFade_DT: '#3D3D3D',

        bg: '#FFFFFF',
        bg_DT: '#191919',

        txt: '#282828',
        txt_DT: '#E3E3E3',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
