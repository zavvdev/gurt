import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  darkMode: ['class'],
  content: [
    './src/presentation/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F81F8',
        primaryBg: '#EBF4FF',
        primaryBg_DT: '#313131',
        text: '#282828',
        text_DT: '#E3E3E3',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
