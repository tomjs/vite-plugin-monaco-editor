import { defineConfig } from 'vite';
import monaco from '@tomjs/vite-plugin-monaco-editor';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), monaco({ local: true })],
});
