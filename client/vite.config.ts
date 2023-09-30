import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
      hmr: {
        clientPort: 3001,
      },
    },
    resolve: {
      alias: {
        '~': '/src',
      },
    },
  });
};
