import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/presentation/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F81F8',
        primaryDark: '#1e75de',
        primaryLight: '#EBF4FF',
        primaryLight_Dark: '#3D3D3D',

        bg: '#FFFFFF',
        bg_Dark: '#191919',

        text: '#282828',
        text_Dark: '#E3E3E3',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
