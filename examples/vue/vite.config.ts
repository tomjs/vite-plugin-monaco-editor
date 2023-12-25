import { defineConfig } from 'vite';
import monaco from '@tomjs/vite-plugin-monaco-editor';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), monaco()],
});
