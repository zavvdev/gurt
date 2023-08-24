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
        primaryLight: '#EBF4FF',
        primaryLightDark: '#3D3D3D',

        bg: '#FFFFFF',
        bgDark: '#252627',

        text: '#282828',
        textDark: '#E3E3E3',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
